import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";


type SignInCredentials = {
    email: string;
    password: string;
}
type SignUpCredentials = {
    name: string;
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    signUp(params: SignUpCredentials): Promise<void>
    signOut(): void
    name: string
    accessToken: string
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthData = {
    name: string;
    accessToken: string;
}
const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthData>(() => {
        const { 'cabelex.accessToken': token } = parseCookies()
        if (token) {
            return JSON.parse(token)
        }
        return {} as AuthData
    })
    const routes = useRouter()
    async function signIn({ password, email }: SignInCredentials) {
        const response = await api.post('/users/login', {
            email,
            password,
        });
        const { name, accessToken } = response.data

        setCookie(undefined, 'cabelex.accessToken', JSON.stringify({ name, accessToken }), {
            maxAge: 60 * 60 * 24,
            path: '/'
        })

        setData({ name, accessToken })

        routes.push('/dashboard')
    }
    async function signUp({ name, email, password }: SignUpCredentials) {
        const response = await api.post('/users/signup', {
            name,
            email,
            password,
        });
    }
    async function signOut() {
        destroyCookie(undefined, 'cabelex.accessToken')
        routes.push('/')
    }
    return (
        <AuthContext.Provider value={{ name: data.name, accessToken: data.accessToken, signOut, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    return context;
};