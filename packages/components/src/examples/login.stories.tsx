import { Input, Button, Checkbox, Icon } from "../components";

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
            <label>
                <Checkbox></Checkbox>
                Remember password
            </label>
            <br />
            <Button>Submit</Button>
        </form>
    </div>
);
