export const getOffsetFromUrl = (url: string) => {
  const urlObj = new URL(url)
  const params = new URLSearchParams(urlObj.search)
  const offset = params.get("offset")
  return parseInt(offset!)
}

export const buildNextUrl = (url: string, currentPageLimit: number) => {
  const urlObj = new URL(url)
  urlObj.searchParams.set("limit", currentPageLimit.toString())
  return urlObj.toString()
}
