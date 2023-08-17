
import {css} from "@chasemoskal/magical"

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

	> li {
		display: contents;

		> .thumb {
			grid-column: 1;
			> img {
				display: block;
				width: 3em;
				height: 5em;
				object-fit: cover;
				padding: 0.3rem;
				background: #fff4;
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
				&:is(:hover, :focus) { opacity: 0.8; }
				&:active { opacity: 1; }
				& svg {
					width: 1.5rem;
					height: 1.5rem;
				}
			}
		}
	}
}

.subtotal {
	display: flex;
	justify-content: end;
	padding-right: 2.5rem;

	& .group {
		display: flex;
		flex-direction: column;
		width: max-content;
	}

	& hr {
		opacity: 0.3;
		display: block;
		border: none;
		width: 100%;
		height: 0.1em;
		margin: 1em auto;
		background: currentColor;
	}

	& .block {
		display: flex;
	}

	& .heading {
		opacity: 0.4;
		display: flex;
		align-items: end;
		padding-bottom: 0.5em;
		padding-right: 3em;
		text-transform: uppercase;
		font-weight: bold;
	}
}

[part="checkout"] {
	font-size: 1.5em;
	margin-top: 1em;
	margin-left: auto;
	margin-right: 2.5rem;
	&::part(button) {
		padding: 0.5em 1em;
	}
}

:host {
	container: layout / inline-size;
}

@container (width < 40em) {
	.listing {
		display: flex;
		grid: none;
		flex-direction: column;
		align-items: stretch;
		gap: 1em;

		> li {
			display: grid;
			grid:
				"thumb  title quantity"
				"remove price price   "
				/ auto  minmax(1em, 1fr)   auto;

			background: #fff4;
			padding: 0.5rem;
			box-shadow: 0.2em 0.3em 0.2em #0001;

			> .thumb { grid-area: thumb; }
			> .title { grid-area: title; }
			> .quantity { grid-area: quantity; }
			> .price { grid-area: price; }
			> .remove { grid-area: remove; }

			> .title { padding: 0 0.5rem; }

			> .remove {
				justify-self: center;
				align-self: end;
				> button > svg {
					width: 3rem;
					height: 3rem;
				}
			}

			& input {
				font-size: 1em !important;
			}

			& [data-view="price"] {
				font-size: 0.8em;
			}
		}
	}

	.subtotal {
		padding: 0;
		margin-top: 2rem;
		& hr { display: none; }
		& .block {
			justify-content: end;
			flex-wrap: wrap;
			gap: 0.5rem;
			padding: 0;
		}
		& .heading { }
	}

	[part="checkout-button"] { padding: 0.5rem; }
}

@container (width < 20em) {
	.listing > li {
		position: relative;
		grid:
			"thumb  title"
			"remove quantity"
			"price  price"
			/ auto  minmax(1em, 1fr);
	}
	:is(.quantity, .remove) {
		align-self: center;
	}
	.quantity {
		margin-left: auto;
	}
}

`

