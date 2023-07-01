
export type RawCountryData = {
	name: string
	"alpha-2": string
	"country-code": string
}

export type CountryInfo = {
	name: string
	two_letter: string
	numerical: string
}

export async function fetch_country_info() {
	const map = new Map<string, CountryInfo>()

	const country_codes_data: RawCountryData[] = (
		(await import("./country_codes.js")).default
	)

	for (const data of country_codes_data) {
		const {name, "alpha-2": two_letter, "country-code": numerical} = data
		map.set(two_letter, {name, numerical, two_letter})
	}

	return map
}

export async function query_country_info(two_letter_codes: string[]) {
	const country_info = await fetch_country_info()

	const known: CountryInfo[] = []
	const unknown: string[] = []

	for (const two_letter of two_letter_codes) {
		const info = country_info.get(two_letter)

		if (info)
			known.push(info)

		else
			unknown.push(two_letter)
	}

	return {known, unknown}
}

