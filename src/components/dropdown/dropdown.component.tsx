import { PokemonTypesList } from "@/domain/pokemon/pokemon-card.types"
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
  setSelectedPokemonType: Dispatch<SetStateAction<string>>
}

export const DropdownComponent = ({ setSelectedPokemonType }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([PokemonTypesList[0]])
  )
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    setSelectedPokemonType(
      Array.from(selectedKeys).join(", ").replaceAll("_", " ")
    )
    setSelectedValue(Array.from(selectedKeys).join(", ").replaceAll("_", " "))
  }, [selectedKeys, setSelectedPokemonType])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {PokemonTypesList.map((pokemonType) => (
          <DropdownItem key={pokemonType} className="text-gray-700">
            {pokemonType}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
