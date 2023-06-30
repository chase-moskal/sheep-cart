
export type PagingDetails = {
	after?: string
}

export type PageInfo = {
	endCursor: string
	hasNextPage: boolean
}

export type Fetcher<R> = ({}: PagingDetails) => Promise<{
	objective: R
	pageInfo: PageInfo
}>

