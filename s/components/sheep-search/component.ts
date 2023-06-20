
import {html} from "lit"

import {style} from "./style.css.js"
import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"

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
				router.go_search(value)
			else
				router.go_catalog()
		}

		render() {
			return html`
				<input type="text" @input="${this.#search}"/>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
			`
		}
	}
)

