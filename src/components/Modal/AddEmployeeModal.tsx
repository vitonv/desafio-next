import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, toast, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { BsPieChartFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";
import { Input } from "../Form/Input";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../services/api";

interface AddEmployeeModalProps {
    branch_name?: string
}
type CreateEmployeeFormData = {
    name: string;
    branch_name: string;
}
const createEmployeeSchema = yup.object().shape({
    name: yup.string().required('Nome do funcionário é obrigatório'),
    branch_name: yup.string().required('Nome da filial é obrigatório')
})
export function AddEmployeeModal({ branch_name }: AddEmployeeModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const toast = useToast()
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createEmployeeSchema)
    })
    const createEmployee = useMutation(async ({ branch_name, name }: CreateEmployeeFormData) => {
        await api.post('employees', {
            name,
            branch_name
        })
    }, {
        onError: (error) => {
            toast({
                title: 'Erro ao cadastrar funcionário.',
                description: "Verifique se o funcionário ou a filial já existe no sistema. ",
                status: 'error',
                variant: 'subtle',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        },
        onSuccess: () => {
            toast({
                title: 'Funcionário cadastrado com sucesso.',
                description: "Os dados do funcionário foram registrado em nosso sistema.",
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
    const handleCreateEmployee: SubmitHandler<CreateEmployeeFormData> = async (values) => {
        try {
            await createEmployee.mutateAsync(values)
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
                Adicionar um funcionário
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(handleCreateEmployee)}>
                    <ModalHeader>Cadastrar um funcionário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack rowGap={4}>
                            <Input
                                label="Funcionário"
                                icon={FiUser}
                                name="name"
                                ref={initialRef}
                                error={formState.errors.name}
                                placeholder='Digite o nome do funcionário'
                                {...register('name')}
                            />

                            <Input
                                label="Filial"
                                icon={BsPieChartFill}
                                defaultValue={branch_name}
                                name="branch_name"
                                error={formState.errors.branch_name}
                                placeholder='Digite o nome da filial'
                                {...register('branch_name')}
                            />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose} mr={3} variant="unstyled" color="purple.500">Cancelar</Button>
                        <Button type='submit'>
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}