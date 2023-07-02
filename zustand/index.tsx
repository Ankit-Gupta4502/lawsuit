import { create, } from "zustand"
import {devtools} from "zustand/middleware"
import AuthSlice, { IAuthSlice } from "./Slices/AuthSlice"

const useStore = create<IAuthSlice>()(devtools((...a) => ({
    ...AuthSlice(...a)
})))

export default useStore