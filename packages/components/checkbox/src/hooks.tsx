import { useFormListener } from "@atomico/hooks/use-form";
import { useRender } from "@atomico/hooks/use-render";
import { useProp, useRef, useEvent } from "atomico";

export function useCheckbox(type: "checkbox" | "radio") {
    const [name] = useProp<string>("name");

    const [value] = useProp<string>("value");

    const [checked, setChecked] = useProp<boolean>("checked");

    const refInput = useRef<HTMLInputElement>();

    const dispatchChange = useEvent("change", {
        bubbles: true,
        composed: true,
        base: Event,
    });

    useFormListener("reset", () => {
        setChecked(false);
        dispatchChange();
    });

    useRender(() => {
        return (
            <input
                type={type}
                name={name}
                value={value}
                ref={refInput}
                checked={checked}
                onchange={(event) => {
                    event.stopPropagation();
                }}
                onclick={() => {
                    setChecked(!checked);
                    dispatchChange();
                }}
            />
        );
    }, [checked, name, type]);

    return refInput;
}
