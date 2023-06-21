import { c, css } from "atomico";
import { GenericTokens } from "@atomico/ui-tokens";

function avatarLabel() {
    return (
        <host shadowDom>
            <div class="avatar">
                <slot name="avatar"></slot>
            </div>
            <div class="labels">
                <slot></slot>
            </div>
        </host>
    );
}

avatarLabel.props = {
    small: {
        type: Boolean,
        reflect: true,
    },
};

avatarLabel.styles = [
    GenericTokens,
    css`
        :host {
            width: 100%;
            display: flex;
            align-items: center;
            gap: var(--space-safe);
        }
        .avatar {
            display: flex;
            place-content: center;
        }
        .labels {
            display: grid;
        }
    `,
];

export const AvatarLabel = c(avatarLabel);
