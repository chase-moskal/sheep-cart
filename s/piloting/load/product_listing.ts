
import {Op} from "@benev/frog"
import {GqlProduct, PageGenerator} from "shopify-shepherd"

import {Situation} from "../../context/types/situations.js"

export async function load_product_listing(
		wrap: (list: Situation.Base.ProductList) => Situation.Whatever,
		set_situation_op: Op.Setter<Situation.Whatever>,
		generator: PageGenerator<GqlProduct>,
		previous_products: GqlProduct[] = [],
	) {

	const this_is_the_initial_listing_call = previous_products.length === 0

	async function load_next_page_of_products(): Promise<Situation.Whatever> {
		const {value} = await generator.next()
		const [new_products, more] = value!
		const products = [...previous_products, ...new_products]
		const load_more = more
			? () => load_product_listing(wrap, set_situation_op, generator, products)
			: undefined

		return wrap({
			products,
			load_more,
			load_more_op: Op.ready(undefined),
		})
	}

	if (this_is_the_initial_listing_call) {
		await Op.run<Situation.Whatever>(
			set_situation_op,
			async() => await load_next_page_of_products(),
		)
	}
	else {
		set_situation_op(Op.ready(wrap({
			products: previous_products,
			load_more: undefined,
			load_more_op: Op.loading(),
		})))
		set_situation_op(Op.ready(
			await load_next_page_of_products()
		))
	}
}

