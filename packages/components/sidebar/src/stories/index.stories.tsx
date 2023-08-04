import { define } from "@atomico/storybook";
import { Avatar } from "@formas/avatar";
import { Button } from "@formas/button";
import { Icon } from "@formas/icon";
import { Sidebar } from "@formas/sidebar";

export default {
    title: "Example/Dashboard",
    ...define(Sidebar),
};

export const Default = (props) => (
    <div class="frame">
        <Sidebar class="aside" {...props}>
            <Button circle color="primary">
                <Icon slot="icon-prefix" type="plus"></Icon>
                Create
            </Button>
            <Button ghost circle>
                <Icon slot="icon-prefix" type="config"></Icon>
                Inbox
                <Button small badge slot="badge" circle color="danger">
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
        </Sidebar>
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
