
import {Pipe, requirement} from "@benev/frog"
import {Context} from "../context/context.js"
import {Product} from "./views/product/view.js"

export function prepare_all_views(context: Context) {
	return Pipe.with({
			Product,
		})
		.to(requirement.provide(context))
		.done()
}

