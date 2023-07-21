
import {Op} from "@benev/frog"
import {GqlProduct, NotFoundError} from "shopify-shepherd"

import {Situation} from "../../context/types/situation.js"

export async function load_single_product(
		set_situation_op: Op.Setter<Situation>,
		product: Promise<GqlProduct>,
	) {

	await Op.run<Situation>(
		set_situation_op,
		async() => {
			try {
				return {
					type: "ProductFocus",
					product: await product,
				}
			}
			catch (error) {
				if (error instanceof NotFoundError)
					return {type: "NotFound", message: "Product not found"}
				else
					throw error
			}
		},
	)
}

