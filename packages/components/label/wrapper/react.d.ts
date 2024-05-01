import { Label as _Label } from "@formas/label";
import { Component } from "@atomico/react";
export const Label: Component<typeof _Label>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-label": Component<typeof _Label>;
   }
}