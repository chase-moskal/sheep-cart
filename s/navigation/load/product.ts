
import {Shopify} from "shopify-shepherd"

import {Op} from "../../context/utils/op.js"
import {Routes} from "../../routing/types.js"
import {Situation} from "../../context/types/situation.js"

export async function load_single_product(
		route: Routes["product"],
		shopify: Shopify,
		set_situation_op: Op.Setter<Situation>,
	) {

	await Op.run<Situation>(
		set_situation_op,
		async() => ({
			type: "ProductFocus",
			product: await shopify.product({id: route.id}),
		}),
	)
}

