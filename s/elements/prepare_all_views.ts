
import {Pipe, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {Product} from "./views/product/view.js"
import {ProductList} from "./views/product_list/view.js"
import {CollectionList} from "./views/collection_list/view.js"

export function prepare_all_views(context: Context) {
	return Pipe.with({
			Product,
			ProductList,
			CollectionList,
		})
		.to(requirement.provide(context))
		.done()
}

