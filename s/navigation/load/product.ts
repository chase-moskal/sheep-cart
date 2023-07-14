
import {loader} from "../types.js"
import {Routes} from "../../routing/types.js"

export const load_product = loader<Routes["product"]>(
	async(route, {shopify, context}) => {

		const product = await shopify.product({id: route.id})

		context.situation.value = {
			type: "ProductFocus",
			product,
		}
	}
)

