import { c, css, useProp } from "atomico";

function component() {
    const [checked, setChecked] = useProp("checked");
    return (
        <host shadowDom>
            <button class="container" onclick={() => setChecked(!checked)}>
                <div class="dot"></div>
            </button>
        </host>
    );
}

component.props = {
    checked: {
        type: Boolean,
        value: false,
        reflect: true,
    },
};

component.styles = css`
    :host {
        --transform-x: 0px;
    }
    :host([checked]) {
        --transform-x: 14px;
    }
    .container {
        all: unset;
        width: 30px;
        height: 15px;
        background: black;
        border-radius: 100px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .dot {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: white;
        margin: 2px;
        transform: translateX(var(--transform-x));
        transition: 0.25s;
    }
`;

export const Switch = c(component);
