import { Badge as _Badge } from "@formas/badge";
import { Component } from "@atomico/react";
export const Badge: Component<typeof _Badge>;
declare namespace JSX {
   interface IntrinsicElements{
      "formas-badge": Component<typeof _Badge>;
   }
}