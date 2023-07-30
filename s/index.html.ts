
import {shopping_cart_icon} from "./icons/feather/shopping_cart_icon.js"
import {template, html, easypage, startup_scripts_with_dev_mode, html as svg} from "@benev/turtle"

export default template(async basics => {
	const path = basics.path(import.meta.url)
	return easypage({
		path,
		css: "index.css",
		title: "dev bakery (sheep-cart demo)",
		head: html`
			${startup_scripts_with_dev_mode(path)}
			<link rel="icon" href="${path.root('assets/devbakery.favicon.png')}"/>
		`,
		body: html`

			<a class="sheep" href="https://github.com/chase-moskal/sheep-cart">
				<div>
					<p>this is a live demo for <strong>sheep-cart</strong></p>
				</div>
				<div>
					<img class=sheep-logo alt="sheep-cart" src="${path.root('assets/sheep-logo.webp')}"/>
				</div>
			</a>

			<header class="header slice">
				<h1>
					<img class=bakery-logo alt="dev bakery" src="${path.root('assets/devbakery.webp')}"/>
				</h1>
				<div class=bigbar>

					<div class=search-area>
						<sheep-search></sheep-search>
					</div>

					<div class=cart-area>
						<button>${shopping_cart_icon(svg)}</button>
						<sheep-cart></sheep-cart>
					</div>

				</div>
			</header>

			<section class="catalog slice">
				<sheep-catalog></sheep-catalog>
			</section>
		`,
	})
})

