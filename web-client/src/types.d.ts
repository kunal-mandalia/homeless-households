declare interface IHomelessHouseholds {
  id: number,
  age: number,
  decision: string,
  decisionCode: number,
  decisionDate: Date,
  ethnicity: string,
  nationality: string,
  reason: string,
  need: string,
}

declare type NullableString = string | null;
 
declare type FilterAttribute = "ageRange" | "decision" | "ethnicity" | "nationality" | "need" | "reason";

declare type Decision = "approved permanent rehous"
  | "management transfer"
  | "resettlement case"
  | "Intentionally homeless"
  | "no priority need"
  | "Not Homeless"
  | "not elig, other";


declare interface IFilters {
  ageRange: number[];
  decision: NullableString;
  ethnicity: NullableString;
  nationality: NullableString
  need: NullableString;
  reason: NullableString;
  touched: boolean;
}

declare module 'waait';