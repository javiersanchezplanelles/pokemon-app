import { PokemonTypesList } from "@/domain/pokemon/pokemon.types"
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
  selectedPokemonType: string
}

export const DropdownComponent = ({
  setSelectedPokemonType,
  selectedPokemonType,
}: Props) => {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([PokemonTypesList[0].name])
  )
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    setSelectedPokemonType(
      Array.from(selectedKeys).join(", ").replaceAll("_", " ")
    )
    setSelectedValue(Array.from(selectedKeys).join(", ").replaceAll("_", " "))
  }, [selectedKeys, setSelectedPokemonType])

  useEffect(() => {
    if (selectedPokemonType === PokemonTypesList[0].name) {
      setSelectedKeys(new Set([PokemonTypesList[0].name]))
    }
  }, [selectedPokemonType])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize text-white">
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
          <DropdownItem key={pokemonType.name} className="text-gray-700">
            {pokemonType.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
