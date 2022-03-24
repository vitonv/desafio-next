import { useDisclosure, Text, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading, chakra, Icon, useColorModeValue, useToast } from "@chakra-ui/react"
import React from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { useQueryClient } from "react-query";
import { useBranches } from "../../hooks/services/useBranches";


interface RemoveBranchAlertProps {
    id?: string;
    name: string
}
export function RemoveBranchAlert({ id, name }: RemoveBranchAlertProps) {
    const cancelRef = React.useRef()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { deleteBranch } = useBranches()
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleDeleteBranch() {
        try {
            await deleteBranch(id)
            toast({
                title: 'Excluido com sucesso.',
                description: "Os dados da filial foram removidos do nosso sistema. ",
                status: 'success',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            queryClient.invalidateQueries('branches')
            onClose()
        } catch (error) {
            toast({
                title: 'Erro ao excluir filial.',
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
                onClick={onOpen}
                display="flex"
                variant='unstyled'
                alignItems="center"
                mt={4}
                pr="4"
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Icon as={BsTrash2Fill} h={6} w={6} mr={2} />

                <chakra.h1 px={2} fontSize="sm" fontWeight='normal'>
                    Excluir
                </chakra.h1>
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading size="lg">Excluir Filial</Heading>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Você tem certeza que deseja excluir a filial <Text as="span" fontWeight="bold">{name}</Text>? Essa operação não poderá ser desfeita.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red'
                                onClick={handleDeleteBranch} ml={3}>
                                Excluir
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}