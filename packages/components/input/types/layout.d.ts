type CLickIn = "input" | "prefix" | "suffix" | "icon-prefix" | "icon-suffix" | "action" | "action" | "container" | "dropdown";
export declare const InputLayout: import("atomico/types/dom").Atomico<{
    toggleDropdown: () => void;
    onClickIn: (event: CustomEvent<CLickIn>) => any;
} & {
    small?: boolean;
    disabled?: boolean;
    focused?: boolean;
    showDropdown?: boolean;
    enableDropdown?: boolean;
    enableIconPrefix?: boolean;
    enableIconSuffix?: boolean;
}, {
    toggleDropdown: () => void;
    onClickIn: (event: CustomEvent<CLickIn>) => any;
} & {
    small?: boolean;
    disabled?: boolean;
    focused?: boolean;
    showDropdown?: boolean;
    enableDropdown?: boolean;
    enableIconPrefix?: boolean;
    enableIconSuffix?: boolean;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export {};
