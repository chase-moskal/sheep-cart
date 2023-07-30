
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {CartUnit} from "../../carting/parts/types.js"
import {img} from "../views/product_focus/parts/img.js"
import {render_img} from "../views/product_focus/parts/render_img.js"
import {ProductHelper} from "../views/product_focus/parts/product_helper.js"

export const SheepCart = (context: Context) => class extends QuickElement {
	static styles = style

	#render_unit = (unit: CartUnit) => {
		const producthelp = new ProductHelper(unit.product)
		const image = producthelp.get_variant_image(unit.variant_id)

		const handle_quantity_change = (e: Event) => {
			const target = e.target as HTMLInputElement
			const quantity = parseInt(target.value)
			if (!isNaN(quantity)) {
				context.cart.set_quantity(unit.variant_id, quantity)
			}
		}

		return html`
			<div class="cart-item">
				${render_img(img.tiny(image))}
				<div class="item-info">
					<p>${unit.product.title}</p>
					<p>${unit.variant.title}</p>
					<div class="quantity-control">
						<input type="number" min="0" .value="${unit.quantity}" @change="${handle_quantity_change}">
					</div>
				</div>
			</div>
		`
	}

	render() {
		const {cart} = context
		return html`
			<h2>Your Cart</h2>
			${cart.units.map(this.#render_unit)}
		`
	}
}

