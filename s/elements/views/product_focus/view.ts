
import {html} from "lit"
import {flatview} from "@benev/frog"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

import {style} from "./style.css.js"
import {Context} from "../../../context/context.js"

export const ProductFocus = (context: Context) => flatview(context.flat)
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

