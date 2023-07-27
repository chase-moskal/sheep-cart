
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {Viewbase, viewbase} from "../../viewbase.js"
import {display_price} from "./parts/display_price.js"
import {featured_thumbnail} from "./parts/featured_thumbnail.js"
import {number_of_variants} from "./parts/number_of_variants.js"

export const ProductCard = viewbase(context => v => v
	.tag("article")
	.name("product-card")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`
		${featured_thumbnail(product) && html`
			<img class="thumbnail" alt="" src="${featured_thumbnail(product)!}"/>
		`}

			<h1>
				<a part="a" href="${context.router.routes.product(product).url}">
					${product.title}
				</a>
			</h1>

			${context.views.Pills()(product)}

			${display_price({
				product,
				single_price: price => html`
					<p class=price>$${price}</p>
				`,
				multiple_prices: price => html`
					<p class=price-info>starts at</p>
					<p class=price>$${price}</p>
				`,
			})}

			${number_of_variants(product) > 1
				? html`
					<ul class=options>
						${product.options.map(o => html`
							<li class=option>${o.values.length} ${o.name.toUpperCase()} OPTIONS</li>
						`)}
					</ul>
					<button>SELECT</button>
				`
				: html`<button>ADD TO CART</button>`}
			
	`)
	.css(context.theme, style)
) as Viewbase<[GqlProduct]>
