
import {css} from "lit"

export const style = css`

:host {
	display: block;
}

.grid {
	display: grid;
	grid-template-columns: 1fr 1fr 2fr 1fr;
	gap: 1em;
}

.item {
	display: grid;
	gap: 1em;
	grid:
		"image quantity title price" auto
		/ 1fr  1fr      2fr   1fr;

	> img { grid-area: image; }
	> .quantity { grid-area: quantity; }
	> .title { grid-area: title; }
	> [data-view="price"] { grid-area: price; }
}

`

