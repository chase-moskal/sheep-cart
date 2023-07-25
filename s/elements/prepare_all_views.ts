
import {Pipe, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {ProductList} from "./views/product_list/view.js"
import {ProductCard} from "./views/product_card/view.js"
import {ProductFocus} from "./views/product_focus/view.js"
import {CollectionList} from "./views/collection_list/view.js"

export function prepare_all_views(context: Context) {
	return Pipe.with({
			ProductList,
			ProductCard,
			ProductFocus,
			CollectionList,
		})
		.to(requirement.provide(context))
		.done()
}

