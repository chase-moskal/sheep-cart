
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {style} from "./style.css.js"
import {viewbase} from "../../viewbase.js"
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

		<div class=product-card-info>
			<header>
				<h1>
					<a href="${context.router.routes.product(product).url}">
						${product.title}
					</a>
				</h1>

				<ul class=tags>
					${product.tags.map(tag => html`<li class=tag>${tag}</li>`)}
				</ul>

			</header>

			<div>
				<div class=price>
					${display_price({
						product,
						single_price: price => html`
							<p class=price-text>$${price}</p>
						`,
						multiple_prices: price => html`
							<p>starts at</p>
							<p class=price-text>$${price}</p>
						`,
					})}
				</div>

				${number_of_variants(product) > 1
					? html`
						<div class=corner>
							<ul class=options>
								${product.options.map(o => html`
									<li class=option>${o.values.length} ${o.name.toUpperCase()} OPTIONS</li>
								`)}
							</ul>
							<button>SELECT</button>
						</div>
					`
					: html`<button>ADD TO CART</button>`}
			</div>
		</div>
	`)
	.css(context.theme, style)
)

