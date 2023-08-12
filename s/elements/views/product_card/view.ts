
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {img} from "../product_focus/parts/img.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {display_price} from "./parts/display_price.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {number_of_variants} from "./parts/number_of_variants.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"
import {add_to_cart_button} from "../coolbutton/helpers/add_to_cart_button.js"

export const ProductCard = viewbase(context => v => v
	.tag("article")
	.name("product-card")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`
		<a href="${context.router.routes.product(product).url}">

			${render_img(img.tiny(new ProductHelper(product).featured_image))}

			<div part=plate>
				<h1 part="a title">
					${product.title}
				</h1>

				${context.views.Pills({
					part: "pills",
					exportparts: "pill-collection, pill-tag",
				})(product)}

				<div class=action>

					${number_of_variants(product) > 1
						? html`
							${context.views.Coolbutton({
								class: "button select",
								content: html`
									${number_of_variants(product)} Options
								`,
							})({
								active: true,
								onclick: () => {},
							})}
						`
						: html`
							${context.views.Coolbutton({class: "button add"})(
								add_to_cart_button(
									context.cart,
									new ProductHelper(product).first_variant.id,
									product,
								)
							)}
						`
					}

					<div class=pricebox>
						${display_price({
							product,
							single_price: variant => html`
								${context.views.Price({part: "price"})(variant)}
							`,
							multiple_prices: variant => html`
								<div class=info>starts at</div>
								${context.views.Price({part: "price"})(variant)}
							`,
						})}
					</div>

				</div>
			</div>
		</a>
	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>

