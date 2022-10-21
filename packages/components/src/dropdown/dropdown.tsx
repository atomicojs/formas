import {
    Props,
    c,
    css,
    useRef,
    useHost,
    useProp,
    useEffect,
    DOMEvent,
    DOMListener,
} from "atomico";
import { useListener } from "@atomico/hooks/use-listener";
import { useChannel } from "@atomico/hooks/use-channel";
import { DropdownLayout } from "./dropdown-layout";
import { useSlot } from "@atomico/hooks/use-slot";

function dropdown({ showWithOver }: Props<typeof dropdown>) {
    const host = useHost();
    const refSlotAction = useRef();
    const slotAction = useSlot<Element>(refSlotAction);
    const [show, setShow] = useProp<boolean>("show");

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
            <DropdownLayout show={show} reference={slotAction[0]}>
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
