
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(24em, 1fr));
	width: 100%;
	gap: 1em;
	--plate-color: var(--collection-list-plate-color, #8884);
}

:host > a {
	padding: 1em 2em;
	background-color: var(--plate-color);
	background-size: cover, cover;
	background-position: center center, center center;
	color: white;
	font-weight: bold;
	border-radius: 0.5em;
	box-shadow: 0.1em 0.2em 0.5em #0004;

	font-size: 1.5em;
	color: white;
	text-decoration: none;
	text-shadow:
		0.05em 0.10em 0.5em black,
		0.05em 0.10em 0.5em black,
		0.05em 0.10em 0 black;

	&:hover { text-decoration: underline; }
	&:active { text-decoration: double underline; }
}

`

