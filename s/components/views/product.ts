
import {html} from "lit"
import {flatview} from "@benev/frog"
import {flat} from "../../context/flat.js"
import {GqlProduct} from "shopify-shepherd"
import {unsafeHTML} from "lit/directives/unsafe-html.js"

export const ProductView = flatview({
	flat,
	state: {},

	render: (_, product: GqlProduct) => html`
		<div class=product>
			<p>${product.title}<p>
			<ul>${product.tags.map(tag => html`<li>${tag}</li>`)}</ul>
			<div>${unsafeHTML(product.descriptionHtml)}</div>
		</div>
	`,
})

