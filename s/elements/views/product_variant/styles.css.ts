
import {css} from "@chasemoskal/magical"

export const styles = css`

:host {
	display: block;
}
.grid {
	> .options {
			font-size: 1.2em;
	
			display: flex;
			flex-direction: column;
			gap: 1em;
			padding: 0.5em 0px;
	
			& select {
				padding: 0.5em;
				margin-left: 1em;
			}

			.one-dimension {
				display: flex;
				gap: 0.2em;
				align-items: flex-end;

				> div {
					display: flex;
					flex-direction: column;
					max-width: 5em;
					text-align: center;
					cursor: pointer;

					> img {
						max-width: 100%;
						height: auto;
						user-select: none;
						border: 2px dashed;
						border-color: transparent;
						transition: all 0.3s ease-in-out;
					}

					> p {
						font-size: 0.8em;
						text-align: center;
					}

					.status {
						text-transform: uppercase;
					}

					&[data-selected] {
						> img {
							border-color: currentColor;
						}
					}

					&[data-in-cart] {
						.status {
							color: lime
						}
					}

					&[data-sold-out] {}
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
}



`
