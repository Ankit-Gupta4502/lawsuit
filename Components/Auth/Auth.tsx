import React, { SetStateAction, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, Button, Nav, NavItem, FormGroup, Label, Input, ModalHeader } from "reactstrap"
import { GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { db, auth } from '@/firebase'
import { addDoc, where, collection, query, getDocs } from "firebase/firestore"
import useBoundStore from '@/zustand'
import {toast} from "react-toastify"
type ModalProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
type Terrors = {
    name?: string,
    email?: string,
    password?: string
}
const Auth = ({ isOpen, setIsOpen }: ModalProps) => {
    const toggle = () => setIsOpen(prev => !prev)
    const [signIn, setSignIn] = useState<boolean>(true)
    const [errors, setErrors] = useState<Terrors>({})
    const singInIUser = useBoundStore(state => state.signIn)
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    })


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleValidate = () => {
        const error: { [key: string]: string } = {}
        for (const key in user) {
            if (!user[key as keyof typeof user]) {
                if (key === "name" && signIn) {
                    continue;
                } else {
                    error[key] = `${key} is required`
                }
            }
        }
        setErrors(error)
        console.log(error);
                
        return Object.keys(error).length ? false : true
    }
    const stateToggler = () => {
        setSignIn(prev => !prev), 
        setUser({
            email: "",
            password: "",
            name: ""
        })
        setErrors({})
    }
    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            singInIUser({ name: (user?.displayName || null), email: (user?.email || null), token: (await user?.getIdToken() || null) })
            setIsOpen(false)
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
                console.log(user);

            }
        } catch (err: any) {
            
            toast.error(err.message)
        }
    };


    const logInWithEmailAndPassword = async () => {
        try {
            const getUser = (await signInWithEmailAndPassword(auth, user.email, user.password)).user;
            singInIUser({ name: (getUser?.displayName || null), email: (user?.email || null), token: (await getUser?.getIdToken() || null) })
            setIsOpen(false)
        } catch (err: any) {
            
            toast.error(err.message)
        }
    };


    const registerWithEmailAndPassword = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const getUser = res.user;
            singInIUser({ name: (getUser?.displayName || null), email: (user?.email || null), token: (await getUser?.getIdToken() || null) })
            await addDoc(collection(db, "users"), {
                uid: getUser.uid,
                name: "",
                authProvider: "local",
                email: getUser.email,
            });
            setUser({ name: "", email: "", password: "" })
            setIsOpen(false)
        } catch (err: any) {
            toast.error(err.message)
            
        }
    };


    return (
        <Modal isOpen={isOpen} toggle={toggle} centered >
            <ModalHeader toggle={toggle} ></ModalHeader>
            <Nav justified pills className='mt-3 px-5' >
                <NavItem>
                    <Button color={signIn ? "secondary w-100" : "w-100"} className={signIn ? 'text-primary fw-semibold' : ""} onClick={stateToggler}  >
                        Sign in
                    </Button>
                </NavItem>
                <NavItem>
                    <Button className={!signIn ? 'text-primary fw-semibold' : ""} color={!signIn ? "secondary w-100" : "w-100"} onClick={stateToggler}>
                        Sign up
                    </Button>
                </NavItem>
            </Nav>
            <ModalBody className='px-5' >

                {!signIn && <FormGroup>
                    <Label>
                        Name
                    </Label>
                    <Input onChange={inputHandler} value={user.name} name='name' placeholder='name' invalid={!!errors.name} />
                    <span className="d-block text-danger">
                        {errors.name}
                    </span>
                </FormGroup>}
                <FormGroup>
                    <Label>
                        Email
                    </Label>
                    <Input onChange={inputHandler} value={user.email} name='email' placeholder='email' invalid={!!errors.email} />
                    <span className="d-block text-danger">
                        {errors.email}
                    </span>
                </FormGroup>

                <FormGroup>
                    <Label>
                        Password
                    </Label>
                    <Input onChange={inputHandler} value={user.password} name='password' placeholder='password' invalid={!!errors.password} type='password' />
                    <span className="d-block text-danger">
                        {errors.password}
                    </span>
                </FormGroup>
            </ModalBody>
            <ModalFooter className='px-5' >
                <Button className='w-100' color="primary" onClick={() => signIn ? handleValidate() && logInWithEmailAndPassword()
                 : handleValidate() && registerWithEmailAndPassword()}>
                    {signIn ? "Sign in" : "Sign up"}
                </Button>

                {signIn && <Button className='w-100 text-primary' color="secondary" onClick={() => signInWithGoogle()}>
                    {signIn ? "Sign in" : "Sign up"} with google
                </Button>
                }
            </ModalFooter>
        </Modal>
    )
}

export default Auth