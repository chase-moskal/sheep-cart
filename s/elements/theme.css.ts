
import {css} from "lit"

export const theme = css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.product {
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

