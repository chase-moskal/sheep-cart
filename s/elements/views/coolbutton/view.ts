
import {ShaleView} from "@benev/slate"
import {TemplateResult, html} from "lit"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"

export type CoolbuttonParams = {
	active: boolean
	text?: string | TemplateResult
	onclick: (event: MouseEvent) => void
}

export const Coolbutton = view(_ => class extends ShaleView {
	static name = "coolbutton"
	static styles =styles

	render({active, text, onclick}: CoolbuttonParams) {
		return html`
			<button
				part=button
				@click=${onclick}
				?disabled=${!active}>
				<slot part=slot></slot>
				${text}
			</button>
		`
	}
})

