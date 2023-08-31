
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

		> div {
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
						width: 100%;
						height: 100%;
					}
				}

				> img {
					max-width: 100%;
					height: auto;
					user-select: none;
					
				}
			}

			> p {
				font-size: 0.8em;
				text-align: center;
			}

			.status {
				text-transform: uppercase;
				position: absolute;
				top: -15%;
				width: 100%;
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
