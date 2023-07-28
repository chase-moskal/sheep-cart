
import {css} from "lit"

export const style = css`

:host {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
	width: 100%;
	gap: 0.5em;
}

:host > a {
	display: block;
}

[data-view="product-card"] {
	justify-self: center;
}
`

// #DBB68F
// #BB7e5D
