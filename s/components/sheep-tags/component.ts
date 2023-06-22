
import {html} from "lit"

import {style} from "./style.css.js"
import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"

export const SheepTags = ({}: Context) => (
	class extends QuickElement<boolean> {
		static styles = style

		constructor() {
			super()
			this.state = true
		}

		render() {
			const tags = [
				{name: "alpha"},
				{name: "bravo"},
				{name: "charlie"},
			]

			return html`
				<ul>
					${tags.map(tag => html`
						<li>${tag.name}</li>
					`)}
				</ul>
			`
		}
	}
)

