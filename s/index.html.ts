
import {template, html, easypage, startup_scripts_with_dev_mode} from "@benev/turtle"

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

			<header class="header slice">
				<img
					class=bakery-logo
					alt=""
					src="${path.root('assets/sheep-logo.webp')}"/>
				<div class=bigbar>
					<h1>
						<a href="https://github.com/chase-moskal/sheep-cart">
							<span>sheep-cart</span>
							<small>(on github)</small>
						</a>
					</h1>
					<sheep-search></sheep-search>
					<sheep-nav></sheep-nav>
				</div>
				<sheep-cart-toggler></sheep-cart-toggler>
			</header>

			<section class="catalog slice">
				<sheep-catalog></sheep-catalog>
			</section>
		`,
	})
})

