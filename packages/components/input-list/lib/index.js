import './elements.js';
import { InputList } from './InputList.js';
import { InputListOption } from './InputListOption.js';
import { InputListBadge } from './InputListBadge.js';

customElements.define("formas-input-list", InputList);
customElements.define("formas-input-list-option", InputListOption);
customElements.define("formas-input-list-badge", InputListBadge);

export { InputList, InputListBadge, InputListOption };
