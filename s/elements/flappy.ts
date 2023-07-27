
import {CSSResultGroup, TemplateResult} from "lit"
import {ShadowableTag, Use, flapjack} from "@benev/frog"

import {Context} from "../context/context.js"

export type Render<P extends any[]> = (context: Context) => (use: Use) => (...props: P) => (TemplateResult | void)

export function flappy<P extends any[]>(
		tag: ShadowableTag,
		name: string,
	) {

	return {
		render: (render: Render<P>) => ({
			styles: (...styles: CSSResultGroup[]) => (context: Context) => flapjack({
				flat: context.flat,
				tag,
				name,
				styles: [context.theme, ...styles],
				render: render(context),
			})
		})
	}
}

