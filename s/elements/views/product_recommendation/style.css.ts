
import {css} from "lit"

export const style = css`

:host {
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
}

[data-view="product-card"] {
	flex: 30%;
	min-width: 18em;
	max-width: 30em;
}

`

