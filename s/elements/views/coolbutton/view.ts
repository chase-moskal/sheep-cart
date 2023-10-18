
import {TemplateResult, html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {obsidian} from "../../frontend.js"

export type CoolbuttonParams = {
	active: boolean
	text?: string | TemplateResult
	onclick: (event: MouseEvent) => void
}

export const Coolbutton = obsidian({styles}, _ => (props: CoolbuttonParams) => {
	const {active, text, onclick} = props

	return html`
		<button
			part=button
			@click=${onclick}
			?disabled=${!active}>
			<slot part=slot></slot>
			${text}
		</button>
	`
})

