import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPieChartFill } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../services/api";
import { Input } from "../Form/Input";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

type CreateBranchFormData = {
    name: string;
}
const createBranchSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório')
})
export function AddBranchModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createBranchSchema)
    })
    const createBranch = useMutation(async (branch: CreateBranchFormData) => {
        await api.post('branches', {
            name: branch.name
        })
    }, {
        onError: (error) => {
            toast({
                title: 'Erro ao cadastrar filial.',
                description: "Verifique se o nome da filial já existe em nosso sistema. ",
                status: 'error',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        },
        onSuccess: () => {
            toast({
                title: 'Filial cadastrada com sucesso.',
                description: "Os dados da filial foram registrados em nosso sistema.",
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

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const handleCreateBranch: SubmitHandler<CreateBranchFormData> = async (values) => {
        try {
            await createBranch.mutateAsync(values)
        } catch (error) {
        }
    }
    return (
        <>
            <Button
                size="sm"
                fontSize="sm"
                leftIcon={<Icon as={RiAddLine} />}
                onClick={onOpen}
            >
                Adicionar uma filial
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(handleCreateBranch)}>
                    <ModalHeader>Cadastrar uma filial</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input label="Filial" icon={BsPieChartFill} ref={initialRef} name="name" error={formState.errors.branch} placeholder="Digite o nome da filial" {...register('name')} />
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose} mr={3} variant="unstyled" color="purple.500">Cancelar</Button>
                        <Button type='submit' isLoading={formState.isSubmitting}>
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}