
import {html, svg} from "lit"
import {Attrs, QuickElement} from "@benev/frog"

import icon_shopping_cart from "../../icons/feather/icon_shopping_cart.js"

import {styles} from "./styles.css.js"
import {Context} from "../../context/context.js"

export const SheepCartButton = (context: Context) => class extends QuickElement {
	static styles = styles
	#attrs = Attrs.base<{"triggers-modal": string}>(this as QuickElement)

	get #triggers_modal() {
		return this.#attrs.boolean["triggers-modal"]
	}

	render() {
		const {units} = context.cart

		const onclick = this.#triggers_modal
			? () => context.modal.open({kind: "cart"})
			: () => {}

		return html`
			<button
				part=button
				@click=${onclick}>

				${icon_shopping_cart(svg)}

				<div class=count ?hidden=${units.length === 0}>
					${units.length}
				</div>
			</button>
		`
	}
}

