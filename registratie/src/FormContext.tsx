import React from 'react';

function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
  })
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
    return <ctx.Provider value={{ state, dispatch }} {...props} />
  }
  return [ctx, Provider] as const
}

export type Stap1FormData = {
  naam: string;
  email: string;
  aantalPersonen: number;
  relatie: string;
  aantalKinderen: number;
}

export type Stap2FormData = {
  voornaam: string;
  achternaam: string;
  leeftijd: number;
  geslacht: string;
  anekdote: string;
}

export type Stap3FormData = {
  vrijwilliger: string;
}

export type Stap4FormData = {
  commentaar: string;
  privacyverklaring: boolean;
}

type FormState = {
  stap1?: Stap1FormData,
  stap2?: Stap2FormData[],
  stap3?: Stap3FormData
  stap4?: Stap4FormData
}

type FormAction =
  | { type: 'setStap1FormData', payload: Stap1FormData }
  | { type: 'setStap2FormData', payload: Stap2FormData[] }
  | { type: 'setStap3FormData', payload: Stap3FormData }

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'setStap1FormData':
      return { ...state, stap1: action.payload };
    case 'setStap2FormData':
      return { ...state, stap2: action.payload };
    case 'setStap3FormData':
      return { ...state, stap3: action.payload };
  }
  return state;
}

const [ctx, provider] = createCtx(reducer, {});
export const FormContext = ctx;
export const FormProvider = provider;

