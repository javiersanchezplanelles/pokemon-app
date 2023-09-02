import { Searchbar } from "@/domain/searchbar/searchbar.types"
import React from "react"

export const SearchbarComponent = ({
  setSearchbarInput,
  onSearch,
}: Searchbar) => {
  return (
    <div className="text-center mb-4">
      <input
        className="text-black p-3 border border-gray-200 rounded-lg"
        onChange={(evt) => setSearchbarInput(evt.target.value)}
        placeholder="Blastoise"
      />
      <button
        className="ml-2 p-2 bg-cyan-700 text-white rounded-lg"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  )
}
