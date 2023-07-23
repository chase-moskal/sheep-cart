
import {Pipe, flatstate_reactivity, apply_theme, requirement} from "@benev/frog"

import {Context} from "../context/context.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"
import {SheepCatalog} from "./sheep-catalog/component.js"
import {SheepCollections} from "./sheep-collections/component.js"

export const prepare_all_components = (context: Context) => {
	return Pipe.with({
			SheepTags,
			SheepSearch,
			SheepCollections,
			SheepCatalog,
		})
		.to(requirement.provide(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(context.theme))
		.done()
}

