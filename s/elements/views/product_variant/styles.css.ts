
import {css} from "@chasemoskal/magical"

export const styles = css`

:host {
	display: block;
	--in-cart-color: var(--variant-in-cart-color, lime);
	--sold-out-color: var(--variant-sold-out-color, red);
	--select-highlight-color: var(--varaint-select-color);
}

@container (width < 30em) {
	.one-dimension {
		justify-content: center;
	}
}

.options {
	font-size: 1.2em;

	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 1em 0px;

	& select {
		padding: 0.5em;
		margin-left: 1em;
	}

	.one-dimension {
		display: flex;
		gap: 0.2em;
		padding: 1em 0;

		.status {
			text-transform: uppercase;
			position: absolute;
			top: -15%;
			width: 100%;
		}
	}

	.thumbnail {
		display: flex;
		flex-direction: column;
		max-width: 5em;
		text-align: center;
		cursor: pointer;
		position: relative;

		.img {
			display: flex;
			position: relative;
			border: 3px dashed;
			border-color: transparent;
			transition: all 0.3s ease-in-out;

			.icon {
				position: absolute;
				inset: 0;
				padding: 0.5em;
				backdrop-filter: brightness(0.6);
				color: grey;

				> svg {
					width: 85%;
					height: 85%;
				}
			}

			> img {
				max-width: 100%;
				height: auto;
				user-select: none;
				
			}
		}

		> p {
			font-size: 0.7em;
			text-align: center;
		}

		&[data-selected] {
			.img {
				border-color: var(--select-highlight-color, #fbf505);
			}
		}

		&[data-in-cart] {
			.status {
				color: var(--in-cart-color);
			}
			.icon {
				color: var(--in-cart-color);
			}
		}

		&[data-sold-out] {
			.status {
				color: var(--sold-out-color);
			}
		}
	}

	.v-grid {
		display: grid;
		max-width: max-content;

		grid:
			"names vtwo   vtwo"
			"vone  thumbs thumbs";

		> .names {
			grid-area: names;
			font-size: 0.75em;
			display: flex;
			flex-direction: column-reverse;
			text-transform: uppercase;
			text-align: center;
			line-height: 1.7;

			& :nth-child(1) {
				background: darkslategray;
				color: white;
			}
			& :nth-child(2) {
				border-top-left-radius: 0.5em;
				background: cadetblue;
				color: white;
			}
		}

		> .vone {
			grid-area: vone;
			display: grid;
			align-items: center;
			font-size: 0.75em;
			max-width: 6em;

			text-align: center;
			padding: 0 0.5em;
			width: min-content;
			background: darkslategrey;
		}
		> .vtwo {
			grid-area: vtwo;
			display: grid;
			grid-auto-flow: column;
			place-items: center;
			font-size: 0.75em;
			grid-template-columns: repeat(auto-fit, minmax(4em, 1fr));

			background: cadetblue;
		}
		> .thumbs {
			grid-area: thumbs;
			 > .thmb {
				display: grid;
				grid-auto-flow: column;
				justify-content: center;
			 }
		}

		.icon {
			display: flex;
			align-items: center;
			flex-direction: column;
			text-transform: uppercase;

			> p {
				font-size: 0.6em;
			}
		}

	}

}

.buy {
	display: flex;
	justify-content: end;
	font-size: 1em;
	gap: 1rem;

	> .price {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	> [view="coolbutton"] {
		flex: 2;
		&::part(button) {
			padding: 1em;
		}
	}
}

`
