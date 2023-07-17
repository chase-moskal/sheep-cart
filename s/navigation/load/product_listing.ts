
import {GqlProduct} from "shopify-shepherd"

import {Op} from "../../context/utils/op.js"
import {Situation} from "../../context/types/situation.js"

export async function load_product_listing(
		set_situation_op: (op: Op.Operation<Situation>) => void,
		generator: AsyncGenerator<GqlProduct[]>,
		previous_products: GqlProduct[] = [],
	) {

	const this_is_the_initial_listing_call = previous_products.length === 0

	async function load_next_page_of_products(): Promise<Situation> {

		const page = await generator.next()
		const products = [...previous_products, ...(page.value ?? [])]
		const load_more = page.done
			? undefined
			: () => load_product_listing(set_situation_op, generator, products)

		return {
			type: "ProductListing",
			products,
			load_more,
			load_more_op: new Op.Ready(undefined),
		}
	}

	if (this_is_the_initial_listing_call) {
		await Op.run<Situation>(
			set_situation_op,
			async() => await load_next_page_of_products(),
		)
	}
	else {
		set_situation_op(new Op.Ready({
			type: "ProductListing",
			products: previous_products,
			load_more: undefined,
			load_more_op: new Op.Loading(),
		}))
		set_situation_op(new Op.Ready(
			await load_next_page_of_products()
		))
	}
}
