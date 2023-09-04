import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import React, { Dispatch, SetStateAction } from "react"
import { DropdownComponent } from "../dropdown/dropdown.component"

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
              <ModalBody>
                <DropdownComponent
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
