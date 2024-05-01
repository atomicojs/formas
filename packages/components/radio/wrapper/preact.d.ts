import { Radio as _Radio } from "@formas/radio";
import { Component } from "@atomico/react/preact";
export const Radio: Component<typeof _Radio>;
declare namespace JSX {
   interface IntrinsicElements{
      "atomico-ui-radio": Component<typeof _Radio>;
   }
}