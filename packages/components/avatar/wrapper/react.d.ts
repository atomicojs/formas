import { Avatar as _Avatar } from "@formas/avatar";
import { Component } from "@atomico/react";
export const Avatar: Component<typeof _Avatar>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-avatar": Component<typeof _Avatar>;
   }
}