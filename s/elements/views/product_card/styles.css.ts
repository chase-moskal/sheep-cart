
import {css} from "@chasemoskal/magical"

export const styles = css`

:host > .card {
	display: flex;
	width: 100%;
	height: 100%;
	gap: 0.5em;
	text-decoration: none;
	color: inherit;

	> img {
		flex: 1;
		max-width: 4rem;
		object-fit: cover;
		user-select: none;
	}

	> [part="plate"] {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		gap: 0.5em;

		> h1 {
			font-size: 1.2em;
		}

		> .action {
			display: flex;
			margin-top: auto;
			gap: 0.5em;
			align-items: end;
			flex-wrap: wrap-reverse;
			position: relative;

			> .button {
				flex: 1 1 6em;
				width: 100%;
				max-width: 10em;

				&::part(button) {
					min-height: 3em;
				}

				&::part(slot) {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}

				small {
					font-weight: normal;
				}
			}

			> .pricebox {
				margin-left: auto;
			}

			> .popup {
				position: absolute;
				top: 100%;
				left: 0;
				padding: 0.5em;
				margin-top: 0.5em;
				background: #618fa5;
				z-index: 1;

				display: flex;
				align-items: flex-end;
				gap: 0.3em;

				> .options {
					display: flex;
					flex-direction: column;
					gap: 0.3em;
				}

				> .buy {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
				}
			}

			.blanket {
				position: fixed;
				inset: 0;
				z-index: 1;
				backdrop-filter: brightness(0.5);
			}
		}
	}
}

`

