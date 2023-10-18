
import {html} from "@benev/slate"
import {GqlProduct} from "shopify-shepherd"

import {styles} from "./styles.css.js"
import {Price} from "../price/view.js"
import {Pills} from "../pills/view.js"
import {obsidian} from "../../frontend.js"
import {img} from "../product_focus/parts/img.js"
import {display_price} from "./parts/display_price.js"
import {ProductVariant} from "../product_variant/view.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const ProductCard = obsidian({styles, name: "product-card"}, use => (product: GqlProduct) => {
	const {router, cart} = use.context
	const product_helper = new ProductHelper(product)

	const show_popup = use.signal(false)

	const set_show_popup = (open = !show_popup.value) => {
		show_popup.value = open
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

				${Pills([product], {attrs: {part: "pills", gpart: "pills"}})}

				<div class=action>
					${add_button({
						cart,
						product,
						allow_select: true,
						set_show_popup: set_show_popup,
						variant_id: product_helper.first_variant.id,
					})}

					<div class=pricebox>
						${display_price({
							product,
							single_price: variant => html`
								${Price([variant], {attrs: {part: "price singleprice"}})}
							`,
							multiple_prices: variant => html`
								<div class=info>starts at</div>
								${Price([variant], {attrs: {part: "price multiprice"}})}
							`,
						})}
					</div>
				</div>
			</div>
			${show_popup.value
				? html`
					<div class=popup>
						<div
							@click=${(e: Event) => {
								e.preventDefault()
								set_show_popup()
							}}
							class="blanket"></div>
						${ProductVariant([{
							product,
							on_variant_change: () => {}
						}], {attrs: {part: "variant", class: "product-variant"}})}
					</div>
				`
				: undefined
			}
		</a>
	`
})

