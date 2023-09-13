
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {view} from "../../frontend.js"
import {styles} from "./styles.css.js"
import {Price} from "../price/view.js"
import {Pills} from "../pills/view.js"
import {Coolbutton} from "../coolbutton/view.js"
import {img} from "../product_focus/parts/img.js"
import {display_price} from "./parts/display_price.js"
import {ProductVariant} from "../product_variant/view.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const ProductCard = view({
		styles,
		name: "product-card",
		views: {Price, Pills, Coolbutton, ProductVariant},
	}).render(({router, cart}) => views => use => (product: GqlProduct) => {

		const state = use.state({
			show_popup: false
		})

		function set_show_popup(open = !state.show_popup) {
			state.show_popup = open
		}

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
		
					${views.Pills({part: "pills", gpart: "pills", props: [product]})}
		
					<div class=action>
						${add_button({
							product,
							cart,
							allow_select: true,
							Coolbutton: views.Coolbutton,
							variant_id: new ProductHelper(product).first_variant.id,
							set_show_popup,
						})}
		
						<div class=pricebox>
							${display_price({
								product,
								single_price: variant => html`
									${views.Price({part: "price singleprice", props: [variant]})}
								`,
								multiple_prices: variant => html`
									<div class=info>starts at</div>
									${views.Price({part: "price multiprice", props: [variant]})}
								`,
							})}
						</div>
		
		
					</div>
				</div>
				${state.show_popup
					? html`
						<div class=popup>
							<div
								@click=${(e: Event) => {
									e.preventDefault()
									set_show_popup()
								}}
								class="blanket"></div>
							${views.ProductVariant({
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
	})

