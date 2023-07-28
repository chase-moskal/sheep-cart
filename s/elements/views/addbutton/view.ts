
import {css, html} from "lit"
import {flappy} from "../../flappy.js"

export const Addbutton = flappy("div", "addbutton")
	.render(_ => _ => () => html`
			<button>Add to Cart</button>
	`)
	.styles(css`

		button {
			width: 100%;
			height: 100%;

			cursor: pointer;
			padding: 0.2em 0.5em;
			font: inherit;
			font-weight: bold;
			border: none;
			border: 0.2em solid #fff8;
			border-radius: 0.5em;
			text-transform: uppercase;

			color: white;
			background: #0b0;
			text-shadow: 0.1em 0.1em 0.1em #0004;

			&:is(:hover, :focus) {
				background: #0c0;
			}

			&:active {
				background: #0e0;
			}
		}
	`)

