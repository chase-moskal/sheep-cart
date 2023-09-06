
import {html, svg} from "lit"

import {VariantSelectorOptions} from "./types.js"

import icon_check from "../../../../icons/feather/icon_check.js"
import icon_x from "../../../../icons/feather/icon_x.js"

export function render_2d_variant_selector({
		cart, set_variant, product_helper, selected_variant
	}: VariantSelectorOptions) {

	const {product} = product_helper

	const first_option = product.options[0]
	const values_for_first_option = product.options[0].values
	const values_for_second_option = product.options[1].values
	const names = product.options.map(p => p.name)

	const y = first_option.values.map(val => ({
		value: val,
		variants: product_helper.variants.filter(v => v.title.includes(val))
	}))

	function is_selected(id: string) {
		return id === selected_variant.id
	}

	return html`
		<div class="v-grid">
			<div class=names>
				${names.map(n => html`<p>${n}</p>`)}
			</div>
			<div class=vone>
				${values_for_first_option.map(v => (
					html`<p>${v}</p>`
				))}
			</div>
			<div class=vtwo>
				${values_for_second_option.map(v => (
					html`<p>${v}</p>`
				))}
			</div>
			<div class=thumbs>
				${y.map((d) => (
					html`
						<div class=thmb>
							${d.variants.map(v => {
								const img = product_helper.get_variant_image(v.id) ?? {
									altText: `${v.title} image`,
									url_tiny: "https://i.imgur.com/h1v2noQ.webp"
								}
								const unit = cart.units
									.find(u => u.variant_id === v.id)
				
								const status = unit
									? "in cart"
									: v.availableForSale
										? ""
										: "sold out"
				
								const icon = status === "in cart"
									? html`<div class=icon>${icon_check(svg)}</div>`
									: status === "sold out"
										? html`<div class=icon>${icon_x(svg)}</div>`
										: undefined
				
								return html`
									<div
										class=thumbnail
										@click=${() => set_variant(v)}
										?data-selected=${is_selected(v.id)}
										?data-in-cart=${status === "in cart"}
										?data-sold-out=${status === "sold out"}>
										<!-- ${!!status ? html`<p class=status>${status}</p>` : undefined} -->
										<div class=img>
											<img
												alt="${img.altText}"
												src="${img.url_tiny}"/>
											${icon}
										</div>
										<!-- <p>${v.title.split("/")[1]}</p> -->
									</div>
								`
							})}
						</div>
					`
				))}
			</div>
		</div>
	`

	// return html`
	// 	<div class=dd>
	// 		<div>
	// 			${values_for_second_option.map(v => (
	// 				html`<p>${v}</p>`
	// 			))}
	// 		</div>
	// 		${y.map((d) => (
	// 			html`
	// 				<div class="d-y">
	// 					<p>${d.value}</p>
	// 					<div class=thmb>
	// 						${d.variants.map(v => {
	// 							const img = product_helper.get_variant_image(v.id) ?? {
	// 								altText: `${v.title} image`,
	// 								url_tiny: "https://i.imgur.com/h1v2noQ.webp"
	// 							}
	// 							const unit = cart.units
	// 								.find(u => u.variant_id === v.id)
				
	// 							const status = unit
	// 								? "in cart"
	// 								: v.availableForSale
	// 									? ""
	// 									: "sold out"
				
	// 							const icon = status === "in cart"
	// 								? html`<div class=icon>${icon_check(svg)}</div>`
	// 								: status === "sold out"
	// 									? html`<div class=icon>${icon_x(svg)}</div>`
	// 									: undefined
				
	// 							return html`
	// 								<div
	// 									class=thumbnail
	// 									@click=${() => set_variant(v)}
	// 									?data-selected=${is_selected(v.id)}
	// 									?data-in-cart=${status === "in cart"}
	// 									?data-sold-out=${status === "sold out"}>
	// 									<!-- ${!!status ? html`<p class=status>${status}</p>` : undefined} -->
	// 									<div class=img>
	// 										<img
	// 											alt="${img.altText}"
	// 											src="${img.url_tiny}"/>
	// 										${icon}
	// 									</div>
	// 									<!-- <p>${v.title.split("/")[1]}</p> -->
	// 								</div>
	// 							`
	// 						})}
	// 					</div>
	// 				</div>
	// 			`
	// 		))}
	// 	</div>
	// `
}
