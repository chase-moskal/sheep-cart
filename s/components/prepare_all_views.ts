
import {Pipe, requirement} from "@benev/frog"
import {Product} from "./views/product/view.js"
import {theme as defaultTheme} from "./theme.css.js"

export function prepare_all_views(theme = defaultTheme) {
	return Pipe.with({
			Product,
		})
		.to(requirement.provide(theme))
		.done()
}

