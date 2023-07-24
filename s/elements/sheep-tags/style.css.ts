
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	display: flex;
	gap: 0.5em;
}

label {
	display: flex;
	align-items: center;
	border: 1px solid;
	border-radius: 1em;
	padding: 0 0.3em;

	^[data-active] {
		color: var(--active-tag-color, lime);
	}

	> span {
		font-size: var(--small);
		user-select: none;
		margin-left: 0.5em;
	}
}

`

