
import {Pipe, requirement} from "@benev/frog"
import {Product} from "./views/product/view.js"
import {Context} from "../context/context.js"

export function prepare_all_views(context: Context) {
	return Pipe.with({
			Product,
		})
		.to(requirement.provide(context))
		.done()
}

