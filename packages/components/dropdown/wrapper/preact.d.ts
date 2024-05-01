import { DropdownLayout as _DropdownLayout, Dropdown as _Dropdown } from "@formas/dropdown";
import { Component } from "@atomico/react/preact";
export const DropdownLayout: Component<typeof _DropdownLayout>;
export const Dropdown: Component<typeof _Dropdown>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-dropdown-layout": Component<typeof _DropdownLayout>;,      "forma-dropdown": Component<typeof _Dropdown>;
   }
}