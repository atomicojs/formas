import { useEvent } from "atomico";

export const SPLIT_STRING = ", ";
export const SPLIT_REGEXP = /, */;

export const useSetValue = () =>
    useEvent<string>("SetValue", {
        bubbles: true,
    });

export const getValues = (value: string) =>
    value ? value.split(SPLIT_REGEXP) : [];

export const joinValues = (values: string[]) => values.join(SPLIT_STRING);
