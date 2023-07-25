
import {css} from "lit"

export const style = css`

:host {
	display: flex;

	& button {
		border: 2px solid #38f538;
		padding: 0.5em 1em;
		color: #38f538;
		background-color: transparent;
		cursor: pointer;

		&:hover {
			background-color: #0080004d;
		}
	}
}

`

