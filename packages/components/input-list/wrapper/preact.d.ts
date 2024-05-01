import { InputList as _InputList, InputListOption as _InputListOption, InputListBadge as _InputListBadge } from "@formas/input-list";
import { Component } from "@atomico/react/preact";
export const InputList: Component<typeof _InputList>;
export const InputListOption: Component<typeof _InputListOption>;
export const InputListBadge: Component<typeof _InputListBadge>;
declare namespace JSX {
   interface IntrinsicElements{
      "formas-input-list": Component<typeof _InputList>;,      "formas-input-list-option": Component<typeof _InputListOption>;,      "formas-input-list-badge": Component<typeof _InputListBadge>;
   }
}