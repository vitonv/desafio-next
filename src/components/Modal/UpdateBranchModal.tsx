import { Button, useColorModeValue, chakra, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPenFill, BsPieChartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useBranches } from "../../hooks/services/useBranches";
import { Input } from "../Form/Input";
import * as yup from 'yup'
import { UpdateBranchParams } from "../../interfaces/branch";

export interface UpdateBranchProps {
    id: string;
    name: string;
}
const updateBranchSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório')
})
export function UpdateBranchModal({ id, name }: UpdateBranchProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { updateBranch } = useBranches()
    const toast = useToast()
    const queryClient = useQueryClient()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(updateBranchSchema)
    })
    const updateBranchMutation = useMutation(async ({ id, name }: UpdateBranchProps) => {
        await updateBranch({ id, name })
    }, {
        onError: (error) => {
            toast({
                title: 'Erro ao atualizar filial.',
                description: "Ocorreu um erro inesperado, tente novamente. ",
                status: 'info',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        },
        onSuccess: () => {
            toast({
                title: 'Filial atualizada com sucesso.',
                description: "Os dados da filial foram atualizados em nosso sistema.",
                status: 'success',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            queryClient.invalidateQueries('branches')
            onClose()
        },
    })
    const handleUpdateBranch: SubmitHandler<UpdateBranchParams> = async ({ name }) => {
        try {
            await updateBranchMutation.mutateAsync({ id, name })
        } catch (error) {
        }
    }
    return (
        <>

            <Button
                alignItems="center"
                onClick={onOpen}
                display="flex"
                fontWeight='normal'
                variant='unstyled'
                mt={4}
                pr="4"
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Icon as={BsPenFill} h={6} w={6} mr={2} />

                <chakra.h1 px={2} fontSize="sm">
                    Editar
                </chakra.h1>
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(handleUpdateBranch)}>
                    <ModalHeader>Atualizar dados de uma filial</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input
                            icon={BsPieChartFill}
                            label="Nome da Filial"
                            name="name"
                            error={formState.errors.name}
                            defaultValue={name}
                            ref={initialRef}
                            placeholder='Digite o nome da filial'
                            {...register('name')} />
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose} mr={3} variant="unstyled" color="purple.500">Cancelar</Button>
                        <Button type='submit'>
                            Atualizar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}