import { InputLayout as _InputLayout, Input as _Input } from "@formas/input";
import { Component } from "@atomico/react";
export const InputLayout: Component<typeof _InputLayout>;
export const Input: Component<typeof _Input>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-input-layout": Component<typeof _InputLayout>;,      "forma-input": Component<typeof _Input>;
   }
}