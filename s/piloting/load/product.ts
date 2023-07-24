
import {Op} from "@benev/frog"
import {GqlProduct, ShopifyNotFoundError} from "shopify-shepherd"

import {Situations} from "../../context/types/situations.js"

export async function load_single_product(
		set_situation_op: Op.Setter<Situations.Whatever>,
		product: Promise<GqlProduct>,
	) {

	await Op.run<Situations.Whatever>(
		set_situation_op,
		async() => {
			try {
				return {
					type: "single_product",
					product: await product,
				} satisfies Situations.SingleProduct
			}
			catch (error) {
				if (error instanceof ShopifyNotFoundError)
					return {
						type: "not_found",
						message: "Product not found",
					} satisfies Situations.NotFound
				else
					throw error
			}
		},
	)
}

