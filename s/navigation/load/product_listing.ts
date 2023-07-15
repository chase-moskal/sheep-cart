
import {GqlProduct} from "shopify-shepherd"

import {Op} from "../../context/utils/op.js"
import {Situation} from "../../context/types/situation.js"

export async function load_product_listing(
		set_situation_op: Op.Setter<Situation>,
		generator: AsyncGenerator<GqlProduct[]>,
		previous_products: GqlProduct[] = [],
	) {

	await Op.run<Situation>(
		set_situation_op,
		async() => {
			const page = await generator.next()
			const products = [...previous_products, ...(page.value ?? [])]
			return {
				type: "ProductListing",
				products,
				load_more: page.done
					? undefined
					: () => load_product_listing(set_situation_op, generator, products),
			}
		},
	)
}

