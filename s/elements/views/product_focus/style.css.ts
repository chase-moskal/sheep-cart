
import {css} from "lit"

export const style = css`

:host {
	display: block;
	container-type: inline-size;
}

.grid {
	display: grid;
	width: 100%;
	gap: 0.5em;
	grid-template:
		"f f h h"
		"f f t t"
		"f f o o"
		"f f p b"
		"f f . ." 1fr
		"x d d d"
		/ 1fr 1fr 1fr 1fr;
}

@container (max-width: 30em) {
	.grid {
		grid-template:
			"f f"
			"h h"
			"t t"
			"o o"
			"p b"
			"x x"
			"d d"
			/ 1fr 1fr;
	}
}

.grid {

	> figure { grid-area: f; }
	> h1 { grid-area: h; }
	> .tags { grid-area: t; }
	> .options { grid-area: o; }
	> .price { grid-area: p; }
	> button { grid-area: b; }
	> aside { grid-area: x; }
	> section { grid-area: d; }

	> figure {
		background: #fff2;
		> img {
			display: block;
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	> ul {
		list-style: none;
		display: flex;
		gap: 0.5em;

		> li {
			border: 1px solid white;
			background: #fff2;
			border-radius: 1em;
			padding: 0 0.5em;

			&[data-collection] {
				background: #8af2;
				border-color: cyan;
			}
		}
	}

	> :is(aside, section) {
		margin-top: 1em;
	}

}

`

