import { Loading as _Loading } from "@formas/loading";
import { Component } from "@atomico/react";
export const Loading: Component<typeof _Loading>;
declare namespace JSX {
   interface IntrinsicElements{
      "atomico-ui-loading": Component<typeof _Loading>;
   }
}