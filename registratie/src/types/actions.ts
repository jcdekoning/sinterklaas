import { Stap1FormData, Stap2FormData, Stap3FormData, Stap4FormData } from "./form";

export type FormAction =
  | { type: 'setStap1FormData', payload: Stap1FormData }
  | { type: 'setStap2FormData', payload: Stap2FormData[] }
  | { type: 'setStap3FormData', payload: Stap3FormData }
  | { type: 'setStap4FormData', payload: Stap4FormData }