
import {css} from "@chasemoskal/magical"
import {TemplateResult, html} from "lit"

import {view} from "../../view.js"

export type CoolbuttonParams = {
	active: boolean
	text?: string | TemplateResult
	onclick: (event: MouseEvent) => void
}

export const Coolbutton = view("div", "coolbutton")
	.render(_ => _ => ({active, text, onclick}: CoolbuttonParams) => html`

		<button
			part=button
			@click=${onclick}
			?disabled=${!active}>
			<slot part=slot></slot>
			${text}
		</button>

	`)
	.styles(css`

		:host {
			height: max-content;
			width: max-content;
		}

		button {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 100%;

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

			&[disabled] {
				opacity: 0.5;
				background: #888;
				color: white;
				cursor: default;
			}
		}
	`)

