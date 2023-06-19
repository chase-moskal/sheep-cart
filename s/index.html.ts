
import {template, html, easypage, startup_scripts_with_debug_mode} from "@benev/turtle"

export default template(async basics => {
	const path = basics.path(import.meta.url)
	return easypage({
		path,
		css: "index.css",
		title: "dev bakery (sheep-cart demo)",
		head: html`
			${startup_scripts_with_debug_mode(path)}
			<link rel="icon" href="${path.root('assets/devbakery.favicon.png')}"/>
		`,
		body: html`

			<a class="sheep" href="https://github.com/chase-moskal/sheep-cart">
				<div>
					live demo for <strong>sheep-cart</strong>
				</div>
				<div>
					<img class=sheep-logo alt="sheep-cart" src="${path.root('assets/sheep-logo.webp')}"/>
				</div>
			</a>

			<header class="header slice">
				<h1>
					<img class=bakery-logo alt="dev bakery" src="${path.root('assets/devbakery.webp')}"/>
				</h1>
				<div class=bar>
					<input class=search type="text"/>
					<ul class=tags>
						<li>alpha</li>
						<li>beta</li>
					</ul>
				</div>
			</header>

			<section class="catalog slice">
				<div class=cartline>
					<button class=cartbutton>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
					</button>
					<div class=cartpanel hidden>
						shopping cart
					</div>
				</div>
				<ol>
					<li>hello</li>
					<li>world</li>
				</ol>
			</section>
		`,
	})
})

