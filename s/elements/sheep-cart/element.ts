
import {css, html} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"
import {CartUnit} from "../../carting/parts/types.js"
import {img} from "../views/product_focus/parts/img.js"
import {render_img} from "../views/product_focus/parts/render_img.js"
import {ProductHelper} from "../views/product_focus/parts/product_helper.js"
import { GqlPrice } from "shopify-shepherd"

export const SheepCart = (context: Context) => class extends QuickElement {
	static styles = css`
		:host {
			display: block;
		}
		table {
			width: 100%;
			& td {
				width: max-content;
			}
			& td.title {
				max-width: 99%;
			}
		}
		.quantity input {
			width: 3em;
		}
		img {
			width: 3em;
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

		const handle_remove = () => {
			context.cart.remove(unit.variant_id)
		}

		const coolprice: GqlPrice = {
			amount: (parseFloat(variant.price.amount) * unit.quantity).toString(),
			currencyCode: variant.price.currencyCode,
		}

		return html`
			<tr class=item>
				<td class=thumb>
					${render_img(img.tiny(image))}
				</td>
				<td class=quantity>
					<input
						type=number
						min=1
						.value="${unit.quantity}"
						@change="${handle_quantity_change}"/>
				</td>
				<td class=title>
					<p>${unit.product.title}</p>
					<p>${variant.title}</p>
				</td>
				<td class=price>
					${context.views.Price()(coolprice)}
				</td>
				<td class=remove>
					<button @click="${handle_remove}">remove</button>
				</td>
			</tr>
		`
	}

	render() {
		const {cart} = context
		return html`
			<h2>Your Cart</h2>
			<table>
				<tr>
					<th></th>
					<th>quantity</th>
					<th>item</th>
					<th>price</th>
					<th></th>
				</tr>
				${cart.units.map(this.#render_unit)}
			</table>
		`
	}
}

