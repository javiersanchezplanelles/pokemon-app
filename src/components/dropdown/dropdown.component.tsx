import { PokemonTypesList } from "@/domain/pokemon/pokemon-card.types"
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import React, { Dispatch, SetStateAction, useState } from "react"

interface Props {
  setSelectedPokemonType: Dispatch<SetStateAction<string>>
}

export const DropdownComponent = ({ setSelectedPokemonType }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState([PokemonTypesList[0]])
  const selectedValue = React.useMemo(() => {
    return Array.from(selectedKeys).join(", ").replaceAll("_", " ")
  }, [selectedKeys])

  const handleKeys = (evt) => {
    setSelectedKeys(evt)
    setSelectedPokemonType(
      Array.from(selectedKeys).join(", ").replaceAll("_", " ")
    )
  }

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
        onSelectionChange={(evt) => handleKeys(evt)}
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
