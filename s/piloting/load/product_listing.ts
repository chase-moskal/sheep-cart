
import {Op} from "@benev/frog"
import {GqlProduct, PageGenerator} from "shopify-shepherd"

import {Situations} from "../../context/types/situations.js"

export async function load_product_listing(
		set_situation_op: Op.Setter<Situations.Whatever>,
		generator: PageGenerator<GqlProduct>,
		previous_products: GqlProduct[] = [],
	) {

	const this_is_the_initial_listing_call = previous_products.length === 0

	async function load_next_page_of_products(): Promise<Situations.Whatever> {
		const {value} = await generator.next()
		const [new_products, more] = value!
		const products = [...previous_products, ...new_products]
		const load_more = more
			? () => load_product_listing(set_situation_op, generator, products)
			: undefined

		return {
			type: "product_list",
			products,
			load_more,
			load_more_op: Op.ready(undefined),
		}
	}

	if (this_is_the_initial_listing_call) {
		await Op.run<Situations.Whatever>(
			set_situation_op,
			async() => await load_next_page_of_products(),
		)
	}
	else {
		set_situation_op(Op.ready({
			type: "product_list",
			products: previous_products,
			load_more: undefined,
			load_more_op: Op.loading(),
		}))
		set_situation_op(Op.ready(
			await load_next_page_of_products()
		))
	}
}

