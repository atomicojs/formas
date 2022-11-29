import { Button, Checkbox, Icon, Input, Label } from "../components";

export default {
    title: "Example/Login",
};

export const Default = () => (
    <div>
        <form>
            <Input placeholder="User">
                <Icon type="avatar" slot="icon-prefix"></Icon>
            </Input>
            <Input type="password" placeholder="Password">
                <Icon type="lock" slot="icon-prefix"></Icon>
            </Input>
            <Label>
                <Checkbox slot="action"></Checkbox>
                Remember password
            </Label>
            <br />
            <Button>Submit</Button>
        </form>
    </div>
);
