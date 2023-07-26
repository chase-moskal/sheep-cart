
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {view} from "../../view-base.js"

export const ProductFocus = view("article", "product-focus", context => v => v
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => html`
		<h1>${product.title}</h1>
		<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>
		<div>${unsafeHTML(product.descriptionHtml)}</div>
		<p>variants: ${product.variants.edges.length}</p>
	`)
	.css(context.theme, style)
)

