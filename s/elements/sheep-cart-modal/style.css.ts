
import {css} from "@chasemoskal/magical"

export const style = css`

dialog {
	margin: auto;
	margin-top: 2em;
	background: transparent;
	border: none;

	&::backdrop {
		background: #222222f8;
	}
}

.actions, sheep-cart {
	width: 86em;
	max-width: 100%;
	margin: 0.2em auto;
}

.actions {
	display: flex;
	justify-content: end;
	align-items: center;
}

.close {
	font: inherit;
	background: transparent;
	color: #fffc;
	border: none;

	opacity: 0.7;
	cursor: pointer;

	&:focus { opacity: 0.8; }
	&:hover { opacity: 0.9; }
	&:active { opacity: 1; }

	> svg {
		width: 2em;
		height: 2em;
	}
}

sheep-cart {
	padding: 1em;

	background: #444c;
	color: #fff;
	box-shadow: 1px 2px 5px #0008;
}

`

