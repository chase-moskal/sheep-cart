
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {view, View} from "../../view.js"
import {img} from "../product_focus/parts/img.js"
import {display_price} from "./parts/display_price.js"
import {add_button} from "../coolbutton/helpers/add_button.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

export const ProductCard = view("product-card")
	.render(({router, cart, views}) => _ => (product: GqlProduct) => html`
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
		</a>
	`)
	.styles(style) as View<[GqlProduct]>

