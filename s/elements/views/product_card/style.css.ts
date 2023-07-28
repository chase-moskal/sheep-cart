
import {css} from "lit"

export const style = css`

:host {
	display: flex;
	color: #000a;
	background: #fffd;
	box-shadow: 0.2em 0.3em 0.5em #0004;
}

:host > img {
	flex: 1;
	max-width: 4rem;
	object-fit: cover;
}

.plate {
	display: grid;
	flex: 3;
	grid:
		"title title"
		"pills pills"
		"info options" 1fr
		"price button";
	grid-template-columns: minmax(auto, 1fr) minmax(1em, 2fr);
	gap: 0.2rem;
	padding: 0.4rem;
	background: #fff;
}

h1 {
	grid-area: title;
	font-size: 1.2em;
}

[data-view="pills"] {
	grid-area: pills;
	font-size: 0.8em;
	opacity: 0.7;
	margin-bottom: 0.5rem;
}

.info {
	grid-area: info;
	opacity: 0.8;
	align-self: end;
	justify-self: center;
}

.options {
	grid-area: options;
	opacity: 0.4;
	font-size: 0.8em;
	list-style: none;
	justify-self: center;
	align-self: end;
	font-style: italic;
}

[data-view="price"] {
	grid-area: price;
	font-size: 0.8em;
	justify-self: center;
	padding: 0 0.5em;
}

[data-view="addbutton"] {
	grid-area: button;
	width: 100%;
	height: 100%;

	&.select::part(button) {
		/* background: #0bb; */
	}
}

`

