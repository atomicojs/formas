import { Button } from "./button";
import { defineArgTypes } from "@atomico/storybook/utils";

export default {
  title: "components/brand",
  argTypes: defineArgTypes(Button, {
    color: {
      control: "color",
    },
  }),
};

export const ExampleButton = () => <Button>ok!</Button>;
