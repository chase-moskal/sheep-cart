
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = (context: Context) => class extends QuickElement {

	static styles = style

	render() {
		return html`
			<p>route: zone ${context.route.value.zone}</p>
			${context.situation.value?.type === "ProductListing"
				? html`
					<ol>
						${context.situation.value.products.map(product => html`
							<li>${product.title}</li>
						`)}
					</ol>
					${context.situation.value.load_more
						? html`<button @click=${context.situation.value.load_more}>load more</button>`
						: undefined}
				`
				: undefined}
		`
	}
}

