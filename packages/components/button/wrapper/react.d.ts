import { ButtonActive as _ButtonActive, Button as _Button } from "@formas/button";
import { Component } from "@atomico/react";
export const ButtonActive: Component<typeof _ButtonActive>;
export const Button: Component<typeof _Button>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-button-active": Component<typeof _ButtonActive>;,      "forma-button": Component<typeof _Button>;
   }
}