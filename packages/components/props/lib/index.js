const InputGenericProps = {
  name: { type: String, reflect: true },
  required: { type: Boolean, reflect: true },
  disabled: { type: Boolean, reflect: true },
  value: null,
  small: { type: Boolean, reflect: true },
  focused: { type: Boolean, reflect: true },
  focusable: {
    type: Boolean,
    reflect: true,
    value: true
  }
};

export { InputGenericProps };
