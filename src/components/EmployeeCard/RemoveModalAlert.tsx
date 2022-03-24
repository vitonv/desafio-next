import { useDisclosure, Button, Text, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading, useToast } from "@chakra-ui/react"
import React from "react"
import { useQueryClient } from "react-query";
import { useEmployees } from "../../hooks/services/useEmployees";



export interface RemoveEmployeeAlertDialogProps {
    id?: string
    name: string;
}
export function RemoveEmployeeAlertDialog({ id, name }: RemoveEmployeeAlertDialogProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { deleteEmployee } = useEmployees()
    const cancelRef = React.useRef()
    async function handleDeleteEmployee() {
        try {
            await deleteEmployee(id)
            toast({
                title: 'Excluido com sucesso.',
                description: "Os dados do funcionário foram removidos do nosso sistema. ",
                status: 'success',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            queryClient.invalidateQueries('employees')
            onClose()
        } catch (error) {
            toast({
                title: 'Erro ao excluir funcionário.',
                description: "Ocorreu um erro ao excluir a filial. Tente novamente ",
                status: 'info',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Button
                flex={1}
                rounded={'full'}
                fontSize={'sm'}
                variant="outline" onClick={onOpen}>
                Excluir
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading size="lg">Excluir funcionário</Heading>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Você tem certeza que deseja excluir o funcionário <Text as="span" fontWeight="bold">{name}</Text>? Essa operação não poderá ser desfeita.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteEmployee} ml={3}>
                                Excluir
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}