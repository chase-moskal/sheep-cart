
import {TemplateResult, html} from "lit"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"

export type CoolbuttonParams = {
	active: boolean
	text?: string | TemplateResult
	onclick: (event: MouseEvent) => void
}

export const Coolbutton = view({
		name: "coolbutton",
		styles,
		views: {},
	}).render(_ => _ => _ => ({active, text, onclick}: CoolbuttonParams) => html`

	<button
		part=button
		@click=${onclick}
		?disabled=${!active}>
		<slot part=slot></slot>
		${text}
	</button>

`)

