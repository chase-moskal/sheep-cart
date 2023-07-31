
import {css, html} from "lit"
import {QuickElement} from "@benev/frog"
import {GqlPrice} from "shopify-shepherd"

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

		:host([hidden]) {
			display: none;
		}

		h2 {
			text-align: center;
			margin-bottom: 1em;
		}

		.listing {
			list-style: none;
			display: grid;
			grid-template-columns: auto auto 2fr auto;
			grid-auto-rows: auto;
			gap: 1em;
			align-items: center;

			> li {
				display: contents;

				> .thumb {
					grid-column: 1;
					> img {
						display: block;
						width: 3em;
						height: 5em;
						object-fit: cover;
					}
				}

				> .quantity {
					grid-column: 2;
					> input {
						font-size: 1.5em;
						width: 2.5em;
					}
				}

				> .title {
					grid-column: 3;
				}

				> .price {
					grid-column: 4;
					justify-self: end;
				}

				> .remove {
					grid-column: 5;
				}
			}
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
		const line_items = context.cart.units.map(({variant_id, quantity}) => ({
			variant_id,
			quantity,
		}))
		const result = await context.shopify.checkout({line_items})
		console.log("CHECKOUT", result)
	}

	render() {
		const {cart, views} = context
		return html`
			<h2>Your Cart</h2>
			<ol class=listing>
				${cart.units.map(unit => html`
					<li class=row>
						${this.#render_unit(unit)}
					</li>
				`)}
			</ol>
			<div>
				${views.Coolbutton()({
					active: true,
					text: "Checkout",
					onclick: this.#checkout,
				})}
				<button></button>
			</div>
		`
	}
}

