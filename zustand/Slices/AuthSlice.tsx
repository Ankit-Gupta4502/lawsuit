import { StateCreator } from "zustand"

interface Iauth {

    token?: string | null,
    name?: string | null,
    email?: string | null

}

interface Iuser { token: string | null, name: string | null, email: string | null }
const getInitialState = (): Iauth => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("lawsuit-user")
        return user ? JSON.parse(user) : {}
    } else {
        return {}
    }
}

const setUserOnStorage = (user: Iuser) => {
    localStorage.setItem("lawsuit-user", JSON.stringify(user))
}
export interface IAuthSlice {
    auth: Iauth,
    isAuthenticated: boolean,
    signIn: ({ token, name, email }: Iuser) => void,
    signOut: () => void
}

const AuthSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
    auth: getInitialState(),
    isAuthenticated: !!Object.keys(getInitialState()).length,
    signIn: ({ token, name, email }) => {
        set(state => ({
            isAuthenticated: true, auth: {
                token,
                name,
                email
            }
        }))
        setUserOnStorage({ token, name, email })
    },
    signOut: () => {
        set(state => ({ isAuthenticated: false, auth: {} }))
    }
})

export default AuthSlice