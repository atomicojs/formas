import { useListener } from "@atomico/hooks/use-listener";
import { useParent } from "@atomico/hooks/use-parent";
import { useResizeObserverState } from "@atomico/hooks/use-resize-observer";
import { useSlot } from "@atomico/hooks/use-slot";
import {
    c,
    css,
    DOMEvent,
    DOMListener,
    useEffect,
    useHost,
    useProp,
    useRef,
    useContext,
    createContext,
    createRef,
} from "atomico";
import { DropdownLayout } from "./layout";

export const DropdownContext = createContext({ show: false });

const refWindow = createRef(window);

export const Dropdown = c(
    ({ showWithOver }) => {
        const host = useHost();
        const refSlotAction = useRef();
        const slotAction = useSlot<Element>(refSlotAction);
        const [show, setShow] = useProp<boolean>("show");
        const refAction = useRef();

        refAction.current = slotAction.at(0);

        useListener(refWindow, "click", (event) => {
            if (!event.composedPath().includes(host.current)) {
                setShow(false);
            }
        });

        const { show: parentShowWithOver } = useContext(DropdownContext);

        showWithOver = parentShowWithOver || showWithOver;

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
                <DropdownContext value={{ show: showWithOver }}>
                    <DropdownLayout
                        show={show}
                        reference={slotAction[0]}
                        style={
                            state?.width
                                ? `--min-width: ${state.width}px;`
                                : null
                        }
                    >
                        <slot />
                    </DropdownLayout>
                </DropdownContext>
            </host>
        );
    },
    {
        props: {
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
        },
        styles: css`
            :host {
                display: contents;
            }
        `,
    }
);
