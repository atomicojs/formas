import { SelectOption as _SelectOption, Select as _Select } from "@formas/select";
import { Component } from "@atomico/react/preact";
export const SelectOption: Component<typeof _SelectOption>;
export const Select: Component<typeof _Select>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-select-option": Component<typeof _SelectOption>;,      "forma-select": Component<typeof _Select>;
   }
}