import { jsx } from 'atomico/jsx-runtime';
import { getCoordinates } from '@atomico/hooks/use-click-coordinates';
import { c, useState, css } from 'atomico';

const ButtonActive = c(
  () => {
    const [state, setState] = useState();
    return /* @__PURE__ */ jsx(
      "host",
      {
        shadowDom: true,
        setEvent: (event) => {
          const { offset } = getCoordinates(event);
          setState(
            (state2) => state2?.pending ? state2 : { offset, pending: true }
          );
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            style: state?.offset ? `--x:${state?.offset?.x}px; --y:${state?.offset?.y}px` : "",
            class: state?.pending ? "show" : "",
            onanimationend: () => setState({})
          }
        )
      }
    );
  },
  {
    styles: css`:host{width:100%;height:100%;position:absolute;top:0;left:0;display:block;overflow:hidden;--background: var(--color-active)}div{width:10px;height:10px;position:absolute;top:calc(var(--y) - 5px);left:calc(var(--x) - 5px);opacity:0;background:var(--background);border-radius:100%}.show{transform:scale(2);opacity:1;animation:scale .5s ease 1}@keyframes scale{0%{opacity:0;transform:scale(0)}50%{opacity:1}to{transform:scale(10);opacity:0}}`
  }
);

export { ButtonActive };
