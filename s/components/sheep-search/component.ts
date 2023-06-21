
import {html, svg} from "lit"

import {style} from "./style.css.js"
import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"
import {search_icon} from "../../icons/feather/search_icon.js"

export const SheepSearch = ({router}: Context) => (
	class extends QuickElement<boolean> {
		static styles = style

		constructor() {
			super()
			this.state = true
			this.updated.then(() => {
				if (router.route.zone === "search")
					this.input.value = router.route.query
			})
		}

		get input() {
			return this.root.querySelector<HTMLInputElement>("input")!
		}

		#search = () => {
			const {value} = this.input

			if (value.length > 0)
				router.go_search(value, ["alpha", "beta"])
			else
				router.go_catalog()
		}

		render() {
			return html`
				<input type="text" @input="${this.#search}"/>
				${search_icon(svg)}
			`
		}
	}
)

