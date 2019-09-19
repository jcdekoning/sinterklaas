import React from 'react';

import { FormAction } from './types/actions';
import { FormState } from './types/form';

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

