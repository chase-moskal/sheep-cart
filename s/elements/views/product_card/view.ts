
import {html} from "lit"
import {ShaleView} from "@benev/slate"
import {GqlProduct} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {Price} from "../price/view.js"
import {Pills} from "../pills/view.js"
import {view, views} from "../../frontend.js"
import {Coolbutton} from "../coolbutton/view.js"
import {img} from "../product_focus/parts/img.js"
import {display_price} from "./parts/display_price.js"
import {ProductVariant} from "../product_variant/view.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const ProductCard = view(context => class extends ShaleView {
	static name = "product-card"
	static styles = styles

	#views = (product?: GqlProduct) => views(context, {
		Price,
		Pills,
		Coolbutton,
		ProductVariant: ProductVariant(product!)
	})

	#state = context.flat.state({
		show_popup: false
	})

	#set_show_popup = (open = !this.#state.show_popup) => {
		this.#state.show_popup = open
	}

	render(product: GqlProduct) {
		const {router, cart} = context
		return html`
			<a href="${router.routes.product(product).url}">
		
				${render_img({
					part: "img",
					img: img.tiny(new ProductHelper(product).featured_image),
				})}
		
				<div part=plate>
					<h1 part="title a" data-gpart="a">
						${product.title}
					</h1>
		
					${this.#views().Pills({part: "pills", gpart: "pills", props: [product]})}
		
					<div class=action>
						${add_button({
							product,
							cart,
							allow_select: true,
							Coolbutton: this.#views().Coolbutton,
							variant_id: new ProductHelper(product).first_variant.id,
							set_show_popup: this.#set_show_popup,
						})}
		
						<div class=pricebox>
							${display_price({
								product,
								single_price: variant => html`
									${this.#views().Price({part: "price singleprice", props: [variant]})}
								`,
								multiple_prices: variant => html`
									<div class=info>starts at</div>
									${this.#views().Price({part: "price multiprice", props: [variant]})}
								`,
							})}
						</div>
		
		
					</div>
				</div>
				${this.#state.show_popup
					? html`
						<div class=popup>
							<div
								@click=${(e: Event) => {
									e.preventDefault()
									this.#set_show_popup()
								}}
								class="blanket"></div>
							${this.#views(product).ProductVariant({
								part: "variant",
								class: "product-variant",
								props: [{
									product,
									on_variant_change: () => {}
								}]
							})}
						</div>
					`
					: undefined
				}
			</a>
		`
	}
})

