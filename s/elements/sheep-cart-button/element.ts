
import {html, svg} from "lit"
import {Attributes, GoldElement} from "@benev/slate"

import icon_shopping_cart from "../../icons/feather/icon_shopping_cart.js"

import {styles} from "./styles.css.js"
import {Context} from "../../context/context.js"

export const SheepCartButton = (context: Context) => class extends GoldElement {
	static styles = styles

	#attrs = Attributes.base(this as GoldElement, {
		"triggers-modal": Boolean
	})

	get #triggers_modal() {
		return this.#attrs["triggers-modal"]
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

