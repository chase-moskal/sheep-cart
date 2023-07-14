
import {Shopify} from "shopify-shepherd"

import {Route} from "../routing/types.js"
import {Context} from "../components/context.js"

export type LoaderParams = {
	shopify: Shopify
	context: Context
	page_size: number
}

export type Loader<R extends Route> = (
	(route: R, params: LoaderParams) => Promise<void>
)

export function loader<R extends Route>(loader: Loader<R>) {
	return loader
}

