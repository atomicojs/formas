import { Switch as _Switch } from "@formas/switch";
import { Component } from "@atomico/react";
export const Switch: Component<typeof _Switch>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-switch": Component<typeof _Switch>;
   }
}