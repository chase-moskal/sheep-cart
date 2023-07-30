
import {css, html} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"
import {CartUnit} from "../../carting/parts/types.js"
import {img} from "../views/product_focus/parts/img.js"
import {render_img} from "../views/product_focus/parts/render_img.js"
import {ProductHelper} from "../views/product_focus/parts/product_helper.js"

export const SheepCart = (context: Context) => class extends QuickElement {
	static styles = css`
		:host {
			display: block;
		}
		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr 2fr 1fr;
			gap: 1em;
		}
		.item {
			display: grid;
			gap: 1em;
			grid:
				"image quantity title price" auto
				/ 1fr  1fr      2fr   1fr;

			> img { grid-area: image; }
			> .quantity { grid-area: quantity; }
			> .title { grid-area: title; }
			> [data-view="price"] { grid-area: price; }
		}
	`

	#render_unit = (unit: CartUnit) => {
		const producthelp = new ProductHelper(unit.product)
		const image = producthelp.get_variant_image(unit.variant_id)
		const variant = producthelp.get_variant(unit.variant_id)
		if (!variant)
			throw new Error("unknown variant")

		const handle_quantity_change = (e: Event) => {
			const target = e.target as HTMLInputElement
			const quantity = parseInt(target.value)
			if (!isNaN(quantity)) {
				context.cart.set_quantity(unit.variant_id, quantity)
			}
		}

		return html`
			<div class=item>
				${render_img(img.tiny(image))}
				<div type=title>
					<input
						class=quantity
						type=number
						min=1
						.value="${unit.quantity}"
						@change="${handle_quantity_change}"/>
				</div>
				<div class=title>
					<p>${unit.product.title}</p>
					<p>${variant.title}</p>
				</div>
				${context.views.Price()(variant.price)}
			</div>
		`
	}

	render() {
		const {cart} = context
		return html`
			<h2>Your Cart</h2>
			<div class=grid>
				${cart.units.map(this.#render_unit)}
			</div>
		`
	}
}

