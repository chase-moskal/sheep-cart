
import {html, svg} from "@benev/slate"

import icon_shopping_cart from "../../icons/feather/icon_shopping_cart.js"

import {carbon} from "../frontend.js"
import {styles} from "./styles.css.js"

export const SheepCartButton = carbon({styles}, use => {
	const {cart, modal} = use.context
	const {units} = cart

	const attributes = use.attrs({
		"triggers-modal": Boolean
	})

	const onclick = attributes["triggers-modal"]
		? () => modal.open({kind: "cart"})
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
})
