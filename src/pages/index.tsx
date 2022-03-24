import { Flex, Img, Heading, Stack, Input as ChakraInput, Button, Link, Text, FormControl, FormErrorMessage, useToast } from "@chakra-ui/react";
import NextLink from 'next/link'
import { SubmitHandler, useForm } from "react-hook-form";
import { FiMail, FiLock } from "react-icons/fi";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from "../components/Form/Input";
import { withSSRGuest } from "../utils/withSSRGuest";
import { useAuth } from "../hooks/contexts/AuthContext";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { signIn } = useAuth()
  const toast = useToast()
  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      await signIn({ email, password })
    } catch (error) {
      toast({
        title: 'Erro na autenticação',
        description: "Ocorreu um erro ao fazer login, cheque as credenciais.",
        status: 'error',
        variant: 'subtle',
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Img src="/images/logo.png" mb="2" boxSize='200px' objectFit='contain' alignSelf="center" />
        <Heading textAlign="center" fontFamily='Cinzel' mt="-10" fontWeight='400' letterSpacing='widest'>Cabelex</Heading>
        <Heading my="4" textAlign="center" fontSize="3xl">
          Faça seu login
        </Heading>
        <Stack mt="16px" gap="2">
          <Input
            icon={FiMail}
            name="email"
            placeholder="Digite seu e-mail"
            size="md"
            error={formState.errors.email}
            {...register('email')}
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            size="md"
            error={formState.errors.password}
            icon={FiLock}
            {...register('password')}
          />
        </Stack>
        <Link href="/forgotpassword" color="primary.500" mb="4" mt="1" as="a" textAlign="right" fontSize="sm">Esqueceu a senha?</Link>
        <Stack gap="2">
          <Button size='md' type='submit' isLoading={formState.isSubmitting}>
            Entrar
          </Button>
          <Text textAlign="center">
            Não possui uma conta ainda?

            <NextLink href="/signup" passHref>
              <Link display="block" fontWeight="bold">Cadastre-se</Link>
            </NextLink>
          </Text>
        </Stack>
      </Flex>
    </Flex>
  )
}


export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  }
})
