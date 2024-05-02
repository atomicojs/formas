import { useEvent } from 'atomico';

const SPLIT_STRING = ", ";
const SPLIT_REGEXP = /, */;
const useSetValue = () => useEvent("SetValue", {
  bubbles: true
});
const getValues = (value) => value ? value.split(SPLIT_REGEXP) : [];
const joinValues = (values) => values.join(SPLIT_STRING);

export { SPLIT_REGEXP, SPLIT_STRING, getValues, joinValues, useSetValue };
