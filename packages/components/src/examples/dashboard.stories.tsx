import { Button, Icon, Label, Avatar } from "../components";
import { NavigationMinimal } from "../navigations";

export default {
    title: "Example/Dashboard",
};

export const Default = () => (
    <div class="frame">
        <NavigationMinimal class="aside">
            <Button circle color="primary">
                <Icon slot="icon-prefix" type="plus"></Icon>
                Create
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="config"></Icon>
                Inbox
                <Button badge slot="badge" circle color="primary">
                    <strong slot="icon-prefix">1</strong>
                </Button>
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="alert"></Icon>
                Articles
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="profile"></Icon>
                home
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="audio"></Icon>
                Direct messages
            </Button>
            <hr />
            <h6>Folders</h6>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="asterisk"></Icon>
                Direct Grups
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="asterisk"></Icon>
                Folders
            </Button>
            <Label slot="footer" reverse gap>
                <Avatar circle slot="action" status="success">
                    <img src="https://github.com/atomicojs.png" alt="avatar" />
                </Avatar>
                <strong>UpperCod</strong>
                <br />
                <small>Administrator</small>
            </Label>
        </NavigationMinimal>
        <style>
            {`
                .frame{
                    width: calc(100vw - 2rem);
                    height: calc(100vh - 2rem);
                    background: white;
                    border-radius: 1rem;
                    border: 1px solid rgba(0,0,0,.2);
                    box-sizing: border-box;
                    overflow: hidden
                }
                .frame{
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                }
            `}
        </style>
    </div>
);
