
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {display_price} from "./parts/display_price.js"
import {number_of_variants} from "./parts/number_of_variants.js"
import {render_featured_image} from "./parts/render_featured_image.js"

export const ProductCard = viewbase(context => v => v
	.tag("article")
	.name("product-card")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`

		${render_featured_image(product)}

		<div class=plate>
			<h1>
				<a part="a product-card-title" href="${context.router.routes.product(product).url}">
					${product.title}
				</a>
			</h1>

			${context.views.Pills()(product)}

			${display_price({
				product,
				single_price: price => html`
					${context.views.Price()(price)}
				`,
				multiple_prices: price => html`
					<div class=info>starts at</div>
					${context.views.Price()(price)}
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
					${context.views.Addbutton({class: "select"})("Select", () => {})}
				`
				: html`
					${context.views.Addbutton({class: "add"})("Add to Cart", () => {})}
				`}
		</div>

	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>
