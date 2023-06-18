import { c, JSX, useRef, h } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";

function text() {
    const ref = useRef();
    const slots = useSlot(ref);
    useRender(
        () => (
            <host>
                <h1 slot="visible">
                    {slots.map((El: JSX) => (
                        <El cloneNode></El>
                    ))}
                </h1>
            </host>
        ),
        slots
    );
    return (
        <host shadowDom>
            <div style="display:none">
                <slot ref={ref}></slot>
            </div>
            <slot name="visible"></slot>
        </host>
    );
}

export const Text = c(text);

<Text<"body"> value="body" fontFamily="body" />;
