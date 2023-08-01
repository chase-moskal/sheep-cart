
import {css} from "lit"

export const style = css`

:host {
	display: block;
}

:host([hidden]) {
	display: none;
}

h2 {
	opacity: 0.4;
	text-transform: uppercase;
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

	max-height: 60vh;
	overflow: auto;

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
				width: 3em;
				background: transparent;
				color: currentColor;
				border: 1px solid currentColor;
				border-radius: 0.5em;
				padding: 0.2em 0.5em;
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
			& button {
				display: flex;
				border: none;
				background: transparent;
				opacity: 0.4;
				cursor: pointer;
				color: currentColor;
				&:is(:hover, :focus) {
					opacity: 0.8;
				}
				&:active {
					opacity: 1;
				}
			}
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

