
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	display: block;
}

ul {
	list-style: none;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5em;
	padding: 0.5em 0;

	li {
		font-size: var(--small);
		flex: 0 0 auto;
		border: 0.1em solid;
		border-radius: 1em;
		padding: 0 0.3em;
	}
}

`

