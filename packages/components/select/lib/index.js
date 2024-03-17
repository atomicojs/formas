import { Select } from './element.js';
import { SelectOption } from './option.js';

customElements.define("forma-select-option", SelectOption);
customElements.define("forma-select", Select);

export { Select, SelectOption };
