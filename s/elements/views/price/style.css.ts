
import {css} from "lit"

export const style = css`

:host {
	display: inline-flex;
	align-items: center;
	gap: 0.1em;
}

.symbol {
	font-size: 2em;
	align-self: center;
}

.dollars {
	font-size: 2.4em;
}

.stack {
	display: inline-flex;
	flex-direction: column;
	line-height: 1em;

	> .currency {
		opacity: 0.5;
		font-size: 0.75em;
	}
}

`

