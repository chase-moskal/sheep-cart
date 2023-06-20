
import {html} from "lit"
import {css} from "@chasemoskal/magical"

import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"

export const SheepSearch = (context: Context) => (
	class extends QuickElement<{example: number}> {

		static styles = css`
			p {
				color: yellow;
			}
		`

		constructor() {
			super()
			this.state = {example: 123}
		}

		render() {
			return html`
				<p>router zone: ${context.router.route.zone}</p>
			`
		}
	}
)

