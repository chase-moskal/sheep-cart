
import {css} from "lit"

export const style = css`

:host {
	display: block;
}

:host([hidden]) {
	display: none;
}

h2 {
	text-align: center;
	margin-bottom: 1em;
}

.listing {
	list-style: none;
	display: grid;
	grid-template-columns: auto auto 2fr auto;
	grid-auto-rows: auto;
	gap: 1em;
	align-items: center;

	> li {
		display: contents;

		> .thumb {
			grid-column: 1;
			> img {
				display: block;
				width: 3em;
				height: 5em;
				object-fit: cover;
			}
		}

		> .quantity {
			grid-column: 2;
			> input {
				font-size: 1.5em;
				width: 2.5em;
			}
		}

		> .title {
			grid-column: 3;
		}

		> .price {
			grid-column: 4;
			justify-self: end;
		}

		> .remove {
			grid-column: 5;
		}
	}
}

.checkout-button {
	font-size: 1.5em;
	margin-top: 1em;
	margin-left: auto;
	&::part(button) {
		padding: 0.5em 1em;
	}
}

`
