
import {html, svg} from "lit"
import {QuickElement} from "@benev/frog"
import {GqlPrice} from "shopify-shepherd"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {sum_subtotal} from "./parts/sum_subtotal.js"
import {CartUnit} from "../../carting/parts/types.js"
import {img} from "../views/product_focus/parts/img.js"
import {VariantPricing} from "../views/price/parts/types.js"
import {render_img} from "../views/product_focus/parts/render_img.js"
import {ProductHelper} from "../views/product_focus/parts/product_helper.js"

import icon_x from "../../icons/feather/icon_x.js"

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

		const currencyCode = variant.price.currencyCode
		const summed_pricing: VariantPricing = {
			price: {
				currencyCode,
				amount: (parseFloat(variant.price.amount) * unit.quantity).toString(),
			},
			compareAtPrice: variant.compareAtPrice
				? {
					currencyCode,
					amount: (parseFloat(variant.compareAtPrice.amount) * unit.quantity).toString(),
				}
				: undefined,
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
				${context.views.Price()(summed_pricing)}
			</div>

			<div class=remove>
				<button
					@click="${handle_remove}">
					${icon_x(svg)}
				</button>
			</div>
		`
	}

	#checkout = async() => {
		const win = window.open("", "_blank")

		if (!win)
			throw new Error("error opening window")

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

		const {webUrl} = await context.shopify.checkout({
			line_items: (context.cart.units
				.map(({variant_id, quantity}) => ({
					variant_id,
					quantity,
				}))
			)
		})

		win.location.href = webUrl
		win.focus()
		context.cart.clear()
	}

	render() {
		const {views, cart: {units}} = context
		return html`
			<h2>
				${units.length > 0
					? "Your Cart"
					: "Cart is Empty"}
			</h2>

			<ol class=listing>
				${units.map(unit => html`
					<li>
						${this.#render_unit(unit)}
					</li>
				`)}
			</ol>

			${units.length > 0
				? html`
					<div class=subtotal>
						<div class=group>
							<hr/>
							<div class=block>
								<div class=heading>
									Subtotal
								</div>
								<div class=price>
									${context.views.Price()(sum_subtotal(units))}
								</div>
							</div>
						</div>
					</div>
					${views.Coolbutton({class: "checkout-button"})({
						active: true,
						text: "Checkout",
						onclick: this.#checkout,
					})}
				`
				: undefined}
		`
	}
}

