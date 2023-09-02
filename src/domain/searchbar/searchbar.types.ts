import { Dispatch, SetStateAction } from "react"

export interface Searchbar {
  setSearchbarInput: Dispatch<SetStateAction<string>>
  onSearch: () => void
}
