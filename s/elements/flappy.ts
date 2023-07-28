
import {CSSResultGroup, TemplateResult} from "lit"
import {ShadowableTag, Use, flapjack} from "@benev/frog"

import {Context} from "../context/context.js"

export type Render<P extends any[]> = (context: Context) => (use: Use) => (...props: P) => (TemplateResult | void)

export function flappy(
		tag: ShadowableTag,
		name: string,
	) {

	return {
		render: <P extends any[]>(render: Render<P>) => ({
			styles: (...styles: CSSResultGroup[]) => (context: Context) => flapjack<P>({
				flat: context.flat,
				tag,
				name,
				styles: [context.theme, ...styles],
				render: render(context),
			})
		})
	}
}

