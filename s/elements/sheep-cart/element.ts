
import {html} from "lit"
import {QuickElement} from "@benev/frog"
import {GqlPrice} from "shopify-shepherd"

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
		const variant = producthelp.get_variant(unit.variant_id)
		if (!variant)
			throw new Error("unknown variant")

		const handle_quantity_change = (e: Event) => {
			const target = e.target as HTMLInputElement
			const quantity = parseInt(target.value)
			if (!isNaN(quantity))
				context.cart.set_quantity(unit.variant_id, quantity)
		}

		const handle_remove = () => {
			context.cart.remove(unit.variant_id)
		}

		const coolprice: GqlPrice = {
			amount: (parseFloat(variant.price.amount) * unit.quantity).toString(),
			currencyCode: variant.price.currencyCode,
		}

		return html`
			<div class=thumb>
				${render_img(img.tiny(image))}
			</div>

			<div class=quantity>
				<input
					type=number
					min=1
					.value="${unit.quantity}"
					@change="${handle_quantity_change}"/>
			</div>

			<div class=title>
				<h3>${unit.product.title}</h3>
				${producthelp.variants.length > 1
					? html`<p>${variant.title}</p>`
					: undefined}
			</div>

			<div class=price>
				${context.views.Price()(coolprice)}
			</div>

			<div class=remove>
				<button
					@click="${handle_remove}">
					X
				</button>
			</div>
		`
	}

	#checkout = async() => {
		const {webUrl} = await context.shopify.checkout({
			line_items: (context.cart.units
				.map(({variant_id, quantity}) => ({
					variant_id,
					quantity,
				}))
			)
		})
		const win = window.open("", "_blank")
		if (win) {
			win.document.body.innerHTML = `
				<h1>
					loading checkout...
				</h1>
				<style>
					html, body {
						background: #888;
						color: white;
						padding: 10%;
					}
					h1 {
						text-align: center;
					}
				</style>
			`
			win.location.href = webUrl
			win.focus()
			context.cart.clear()
		}
	}

	render() {
		const {cart: {units}, views} = context
		return html`
			<h2>
				${units.length > 0
					? "Your Cart"
					: "Empty Cart"}
			</h2>

			<ol class=listing>
				${units.map(unit => html`
					<li class=row>
						${this.#render_unit(unit)}
					</li>
				`)}
			</ol>

			${units.length > 0
				? views.Coolbutton({class: "checkout-button"})({
					active: true,
					text: "Checkout",
					onclick: this.#checkout,
				})
				: undefined}
		`
	}
}

