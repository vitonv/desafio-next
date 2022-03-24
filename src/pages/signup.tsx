import { Flex, Img, Heading, Stack, Button, Link, Text, useToast } from "@chakra-ui/react";
import NextLink from 'next/link'
import { SubmitHandler, useForm } from "react-hook-form";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from "../components/Form/Input";
import { useAuth } from "../hooks/contexts/AuthContext";
import { useRouter } from "next/router";




type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const signUpFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não coincidem')
})
export default function SignUp() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpFormSchema)
    })
    const router = useRouter()
    const toast = useToast()
    const { signUp } = useAuth()
    const handleCreateUser: SubmitHandler<SignUpFormData> = async ({ name, email, password }) => {
        try {
            await signUp({ name, email, password })
            toast({
                title: 'Conta criada.',
                description: "Suas credenciais foram registradas em nosso sistema.",
                status: 'success',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            router.push('/')
        } catch (error) {
            toast({
                title: 'Conta criada.',
                description: "Suas credenciais foram registradas em nosso sistema.",
                status: 'error',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Flex
                bg="white"
                as="form"
                w="100%"
                maxW={480}
                p="16"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleCreateUser)}
            >
                <Img src="/images/logo.png" mb="2" boxSize='200px' objectFit='contain' alignSelf="center" />
                <Heading textAlign="center" fontFamily='Cinzel' mt="-10" fontWeight='400' letterSpacing='widest'>Cabelex</Heading>
                <Heading my="4" textAlign="center" fontSize="3xl">
                    Faça seu cadastro
                </Heading>

                <Stack my="16px" gap="2">
                    <Input name="name" placeholder="Digite seu nome" error={formState.errors.name} icon={FiUser} {...register('name')} />
                    <Input name="email" placeholder="Digite seu email" error={formState.errors.email} icon={FiMail} {...register('email')} />
                    <Input name="password" placeholder="Digite sua senha" type="password" error={formState.errors.password} icon={FiLock} {...register('password')} />
                    <Input name="password_confirmation" type="password" placeholder="Confirme sua senha" error={formState.errors.password_confirmation} icon={FiLock} {...register('password_confirmation')} />
                </Stack>
                <Stack gap="2">
                    <Button type='submit' size='md' isLoading={formState.isSubmitting}>
                        Cadastrar
                    </Button>
                    <Text textAlign="center">
                        <NextLink href="/" passHref>
                            <Link display="block" color="purple.500">Voltar para login</Link>
                        </NextLink>
                    </Text>
                </Stack>
            </Flex>
        </Flex>
    )
}
