import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { BsPieChartFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Input } from "../Form/Input";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateEmployeeParams } from "../../interfaces/employee";
import { useMutation, useQueryClient } from "react-query";
import { useEmployees } from "../../hooks/services/useEmployees";
interface UpdateEmployeeProps {
    id: string;
    name: string;
    branch: string;
}
const updateEmployeeSchema = yup.object().shape({
    name: yup.string().required('Nome do funcionário é obrigatório'),
    branch_name: yup.string().required('Nome da filial é obrigatório'),

})
type UpdateParams = Omit<UpdateEmployeeParams, 'id'>
export function UpdateEmployeeModal({ id, name, branch }: UpdateEmployeeProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const initialRef = React.useRef()
    const queryClient = useQueryClient()
    const finalRef = React.useRef()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(updateEmployeeSchema)
    })
    const { updateEmployee } = useEmployees()
    const updateEmployeeMutation = useMutation(async ({ name, branch_name }: UpdateParams) => {
        await updateEmployee({ id, name, branch_name })
    }, {
        onError: (error) => {
            toast({
                title: 'Erro ao atualizar funcionário(a).',
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
                title: 'Funcionário(a) atualizado(a) com sucesso.',
                description: "Os dados do funcionário foram atualizados em nosso sistema.",
                status: 'success',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            queryClient.invalidateQueries('employees')
            onClose()
        },
    })

    const handleUpdateEmployee: SubmitHandler<UpdateParams> = async ({ name, branch_name }) => {
        try {
            await updateEmployeeMutation.mutateAsync({ name, branch_name })
        } catch (error) {
        }
    }
    return (
        <>
            <Button
                flex={1}
                rounded={'full'}
                fontSize="sm"
                _focus={{
                    bg: 'gray.200',
                }}
                onClick={onOpen}
            >
                Editar
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(handleUpdateEmployee)}>
                    <ModalHeader>Atualizar dados de um funcionário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack rowGap={4}>
                            <Input
                                ref={initialRef}
                                icon={FiUser}
                                error={formState.errors.name}
                                name="name"
                                label="Funcionário"
                                defaultValue={name}
                                placeholder="Digite o nome do funcionário"
                                {...register("name")}
                            />

                            <Input
                                name="branch_name"
                                label="Filial"
                                error={formState.errors.branch_name}
                                icon={BsPieChartFill}
                                placeholder="Digite o nome da filial"
                                defaultValue={branch}
                                {...register("branch_name")} />
                        </Stack>

                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose} mr={3} variant="unstyled" color="purple.500">Cancelar</Button>
                        <Button type='submit'>
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}