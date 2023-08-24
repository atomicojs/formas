import { useChannel } from "@atomico/hooks/use-channel";
import { useListener } from "@atomico/hooks/use-listener";
import { useSlot } from "@atomico/hooks/use-slot";
import { useResizeObserverState } from "@atomico/hooks/use-resize-observer";
import {
    c,
    css,
    DOMEvent,
    DOMListener,
    Props,
    useEffect,
    useHost,
    useProp,
    useRef,
} from "atomico";
import { DropdownLayout } from "./layout";
import { useParent } from "@atomico/hooks/use-parent";

function dropdown({ showWithOver }: Props<typeof dropdown>) {
    const host = useHost();
    const refSlotAction = useRef();
    const slotAction = useSlot<Element>(refSlotAction);
    const [show, setShow] = useProp<boolean>("show");
    const refAction = useRef();

    refAction.current = slotAction.at(0);

    useListener({ current: window }, "click", (event) => {
        if (!event.composedPath().includes(host.current)) {
            setShow(false);
        }
    });

    const [parentShowWithOver, setShowWithOver] = useChannel<boolean>(
        "DropdownShowWithOver"
    );

    showWithOver = parentShowWithOver || showWithOver;

    useEffect(() => {
        setShowWithOver(showWithOver);
    }, [showWithOver]);

    const listenerShow: DOMListener<DOMEvent> = (event) =>
        event.isTrusted && setShow(!show);

    listenerShow.capture = true;

    const state = useResizeObserverState(refAction);

    const withIntDropdown = useParent(host.current.localName);

    console.log({ withIntDropdown });

    return (
        <host
            shadowDom
            onmouseleave={() => {
                showWithOver && setShow(false);
            }}
        >
            <slot
                onclick={listenerShow}
                onmouseover={showWithOver ? listenerShow : null}
                ref={refSlotAction}
                name="action"
            ></slot>
            <DropdownLayout
                show={show}
                reference={slotAction[0]}
                style={state?.width ? `--min-width: ${state.width}px;` : null}
            >
                <slot />
            </DropdownLayout>
        </host>
    );
}

dropdown.props = {
    show: {
        type: Boolean,
        reflect: true,
    },
    showWithOver: {
        type: Boolean,
        reflect: true,
    },
    width: String,
    widthFull: {
        type: Boolean,
        reflect: true,
    },
};

dropdown.styles = css`
    :host {
        display: contents;
    }
`;

export const Dropdown = c(dropdown);
