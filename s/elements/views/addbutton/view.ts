
import {css, html} from "lit"
import {flappy} from "../../flappy.js"

export const Addbutton = flappy("div", "addbutton")
	.render(_ => _ => (text: string, onclick: () => void) => html`
		<button part=button @click=${() => onclick()}>
			${text}
		</button>
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

			opacity: 0.7;
			color: white;
			background: #0b0;
			text-shadow: 0.1em 0.1em 0.1em #0004;

			&:is(:hover, :focus) {
				opacity: 0.9;
			}

			&:active {
				opacity: 1;
			}
		}
	`)

