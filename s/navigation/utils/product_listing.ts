
import {GqlProduct} from "shopify-shepherd"
import {Context} from "../../context/context.js"

export async function product_listing(
		context: Context,
		generator: AsyncGenerator<GqlProduct[]>,
	) {

	async function load_more() {
		const page = await generator.next()
		context.situation.value = {
			type: "ProductListing",
			products: [
				...(context.situation.value?.type === "ProductListing"
					? context.situation.value.products
					: []),
				...(page.value ?? []),
			],
			load_more: page.done
				? undefined
				: load_more,
		}
	}

	context.situation.value = {
		type: "ProductListing",
		products: [],
		load_more,
	}

	await load_more()
}

