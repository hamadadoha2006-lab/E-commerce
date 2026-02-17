export interface categoriesResponse {
  results: number
  metadata: Metadata
  data: categoryes[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface categoryes {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
