
import {css} from "lit"

export const style = css`

dialog {
	margin: auto;
	background: transparent;
	border: none;

	&::backdrop {
		background: #000a;
		backdrop-filter: blur(1em);
	}

}

.actions {
	display: flex;
	justify-content: center;
	align-items: center;

	> .close {
		padding: 0.5em 1em;
		font-size: 1.2em;
	}
}

sheep-cart {
	width: 86em;
	max-width: 92%;
	margin: 0.2em auto;
	box-shadow: 1px 2px 5px #0008;

	padding: 1em;

	background: #444c;
	color: #eeec;
}

`
