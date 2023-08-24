
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	display: block;
	--plate-color: var(--collections-tab-plate-color, #8884)
}

[part="collections-tab"] {
	display: flex;
	gap: 0.5em;
	margin-bottom: 1em;
	flex-wrap: wrap;

	> a {
		padding: 0.3em 0.7em;
		background-color: var(--plate-color);
		background-size: cover, cover;
		background-position: center center, center center;
		color: white;
		border-radius: 0.5em;
		box-shadow: rgba(0, 0, 0, 0.267) 0.1em 0.2em 0.5em;
		font-size: 1.1em;
		text-decoration: none;
		text-shadow:
			0.05em 0.10em 0.5em black,
			0.05em 0.10em 0.5em black,
			0.05em 0.10em 0 black;
		opacity: 0.5;
		transition: all 0.3s ease-in-out;

		&[data-active-collection] {
			opacity: 1;
			font-weight: bold;
		}
	}
}

`

