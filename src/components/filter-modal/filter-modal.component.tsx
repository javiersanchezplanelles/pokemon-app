import { PokemonTypesList } from "@/domain/pokemon/pokemon-card.types"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import React, { Dispatch, SetStateAction } from "react"

interface Props {
  onFind: () => void
  onClear: () => void
  setSelectedPokemonType: Dispatch<SetStateAction<string>>
}

export const FilterModalComponent = ({
  onFind,
  onClear,
  setSelectedPokemonType,
}: Props) => {
  let dropDownItems = []
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([PokemonTypesList[0]])
  )
  const selectedValue = React.useMemo(() => {
    setSelectedPokemonType(
      Array.from(selectedKeys).join(", ").replaceAll("_", " ")
    )
    return Array.from(selectedKeys).join(", ").replaceAll("_", " ")
  }, [selectedKeys, setSelectedPokemonType])

  PokemonTypesList.forEach((pokemonType) => {
    dropDownItems.push(
      <DropdownItem key={pokemonType} className="text-gray-700">
        {pokemonType}
      </DropdownItem>
    )
  })

  return (
    <div>
      <div className="m-5 text-center">
        <Button onPress={onOpen}>Filter by type</Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-gray-700"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Find Pokemon by type
              </ModalHeader>
              <ModalBody className="">
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
                    {dropDownItems}
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClear}
                  onPressEnd={onClose}
                >
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
