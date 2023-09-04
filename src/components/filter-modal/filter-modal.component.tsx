import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { DropdownComponent } from "../dropdown/dropdown.component"
import { PokemonTypesList } from "@/domain/pokemon/pokemon.types"

interface Props {
  onFind: () => void
  onClear: () => void
  selectedPokemonType: string
  setSelectedPokemonType: Dispatch<SetStateAction<string>>
}

export const FilterModalComponent = ({
  onFind,
  onClear,
  selectedPokemonType,
  setSelectedPokemonType,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [backgroundColor, setBackgroundColor] = useState("")

  const getPokemonColorType = useCallback(() => {
    const pokemonType = PokemonTypesList.find(
      (pokemonType) => pokemonType.name == selectedPokemonType
    )
    return pokemonType?.color
  }, [selectedPokemonType])

  useEffect(() => {
    const pokemonColorType = getPokemonColorType()
    setBackgroundColor(pokemonColorType!)
  }, [selectedPokemonType, backgroundColor, getPokemonColorType])

  return (
    <div>
      <div className="m-5 text-center">
        <Button onPress={onOpen}>Filter by type</Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className={backgroundColor}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Find Pokemon by type
              </ModalHeader>
              <ModalBody>
                <DropdownComponent
                  selectedPokemonType={selectedPokemonType}
                  setSelectedPokemonType={setSelectedPokemonType}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClear}>
                  Clear
                </Button>
                <Button color="primary" onPress={onFind} onPressEnd={onClose}>
                  Find
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
