
import {prepare} from "@benev/frog"
import {Context} from "../context/context.js"

export const {component, components, view, views} = prepare<Context>({
	default_auto_exportparts: true,
})

