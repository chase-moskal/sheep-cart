
import {css} from "lit"

export const theme = css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.standard-content {
	& * + * {
		margin-top: 0.7em;
	}

	:is(ul, ol) {
		padding-left: 1.2em;
	}
}

`

