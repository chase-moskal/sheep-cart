
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {img} from "../product_focus/parts/img.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {display_price} from "./parts/display_price.js"
import {render_img} from "../product_focus/parts/render_img.js"
import {number_of_variants} from "./parts/number_of_variants.js"
import {ProductHelper} from "../product_focus/parts/product_helper.js"

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

				${context.views.Pills()(product)}

				${display_price({
					product,
					single_price: price => html`
						${context.views.Price({part: "price"})(price)}
					`,
					multiple_prices: price => html`
						<div class=info>starts at</div>
						${context.views.Price({part: "price"})(price)}
					`,
				})}

				${number_of_variants(product) > 1
					? html`
						<ul class=options>
							${product.options.map(o => html`
								<li class=option>
									${o.values.length} ${o.name.toLowerCase()} options
								</li>
							`)}
						</ul>
						${context.views.Coolbutton({class: "select"})("Select", () => {})}
					`
					: html`
						${context.views.Coolbutton({class: "add"})("Add to Cart", event => {
							event.preventDefault()
							const helper = new ProductHelper(product)
							context.cart.add(helper.first_variant.id, helper.product)
						})}
					`}
			</div>
		</a>
	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>

