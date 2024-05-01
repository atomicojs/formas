import { Checkbox as _Checkbox } from "@formas/checkbox";
import { Component } from "@atomico/react/preact";
export const Checkbox: Component<typeof _Checkbox>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-checkbox": Component<typeof _Checkbox>;
   }
}