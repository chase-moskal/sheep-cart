
import {css} from "@chasemoskal/magical"

export const styles = css`

:host {
	display: block;
	container-type: inline-size;
	--border-radius: var(--sheep-border-radius, 0.2em);
	--frame-padding: var(--sheep-frame-padding, 1em);
	--frame-background: var(--sheep-frame-background, #fff2);
}

[part="grid"] {
	display: grid;
	gap: 1em;
	grid:
		"feature feature feature .        .        .       " 1fr
		"feature feature feature heading  heading  heading "
		"feature feature feature pills    pills    pills   "
		"feature feature feature variants variants variants"
		"feature feature feature .        .        .       " 1fr
		"essay   essay   essay   essay    essay    essay   "
		"images  images  images  images   images   images  ";
	grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	align-items: start;
}

@container (width < 30em) {
	[part="grid"] {
		grid:
			"feature"
			"heading"
			"pills"
			"variants"
			"essay"
			"images"
			/ 1fr;
		grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	}
}

@container (width < 30em) {
	[part="aside"] > img {
		width: 50cqi;
		height: 50cqi;
	}
}

[part="grid"] {
	> figure { grid-area: feature; }
	> h1 { grid-area: heading; }
	> .pills { grid-area: pills; }
	> .product-variant { grid-area: variants; }
	> aside { grid-area: images; }
	> section {
		grid-area: essay;
		max-width: 48em;
		justify-self: center;
		line-height: 1.5;
	}

	> figure {
		padding: var(--frame-padding);
		background: var(--frame-background);
		width: 100%;
		height: 100%;
		align-self: center;
		justify-self: end;

		> img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			user-select: none;
			border-radius: var(--border-radius);
		}
	}

	> h1 {
		font-size: 2em;
	}

	> .pills {
		font-size: 0.8em;
	}

	> aside {
		display: flex;
		flex-wrap: wrap;
		container-type: inline-size;
		padding: var(--frame-padding);
		background: var(--frame-background);
		justify-content: center;

		> img {
			display: block;
			width: 25cqi;
			height: 25cqi;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			user-select: none;
			border-radius: var(--border-radius);
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
}

[part="recbox"] {
	margin-top: 4em;

	> h2 {
		text-align: center;
		margin-bottom: 1em;
	}

	> [view="product-recommendation"] {
		justify-content: center;
	}
}

`

