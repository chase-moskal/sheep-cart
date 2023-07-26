
import {css} from "lit"

export const style = css`

:host {
	display: block;
	container-type: inline-size;
}

.grid {
	display: grid;
	gap: 1em;
	grid:
		"feature feature feature .       .       .      " 1fr
		"feature feature feature heading heading heading"
		"feature feature feature pills   pills   pills  "
		"feature feature feature options options options"
		"feature feature feature price   price   button "
		"feature feature feature .       .       .      " 1fr
		"images  images  essay   essay   essay   essay  ";
	grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	align-items: start;
}

@container (width < 30em) {
	.grid {
		grid:
			"feature feature"
			"heading heading"
			"pills   pills  "
			"options options"
			"price   button "
			"essay   essay  "
			"images  images "
			/ 1fr    1fr;
		grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	}
}

.grid {
	> figure { grid-area: feature; }
	> h1 { grid-area: heading; }
	> .pills { grid-area: pills; }
	> .options { grid-area: options; }
	> .price { grid-area: price; }
	> button { grid-area: button; }
	> aside { grid-area: images; }
	> section { grid-area: essay; }

	> figure {
		background: #fff2;
		width: 100%;
		height: 100%;
		align-self: center;
		justify-self: end;

		> img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	> .pills {
		font-size: var(--small);
	}

	> .options {
		justify-self: end;
	}

	> aside {
		display: flex;
		flex-wrap: wrap;
		container-type: inline-size;

		> img {
			display: block;
			width: 50cqi;
			height: 50cqi;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	&[data-no-additional-images] {
		> aside {
			display: none;
		}
		> section {
			grid-area: images / images / essay / essay;
		}
	}

	&[data-no-options] {
		> .options {
			display: none;
		}
		> .pills {
			grid-row: span 2;
		}
	}

}

`

