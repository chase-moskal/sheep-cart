
import {css} from "lit"

export const style = css`

:host {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	width: 100%;
	gap: 0.5rem;
}

:host > a {
	display: block;
}

[data-view="product-card"] {
	font-size: var(--small);
	max-width: 36rem;
}

`

// #DBB68F
// #BB7e5D
