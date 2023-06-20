
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	display: block;
	position: relative;
}

input {
	display: block;
	font-size: var(--large);
	background: transparent;
	border: 0.1em solid;
	border-radius: 0.5em;
	padding: 0.3em;
	padding-left: 2em;
	color: inherit;
}

svg {
	position: absolute;
	left: 0.5em;
	top: 0;
	bottom: 0;
	margin: auto;
}

`

