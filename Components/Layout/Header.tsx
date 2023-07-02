import React, { SetStateAction, useEffect } from 'react'
import { Container, Button } from 'reactstrap'
import Link from 'next/link'
import useBoundStore from '@/zustand'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
const Header = ({ setIsopen }: { setIsopen: React.Dispatch<SetStateAction<boolean>> }) => {
  const isAuthenticated = useBoundStore(state => state.isAuthenticated)
  const signOutFromStore = useBoundStore(state => state.signOut)
  const signOutUser = () => {
    signOut(auth)
    signOutFromStore()
  }


  return (
    <div style={{ borderBottom: "1px solid #F1E4FF" }} >
      <Container className=' py-3  ' >
        <div className="d-flex justify-content-between align-items-center ">
          <h3 className=' fw-bold mb-0' >Logo</h3>
          <div className="d-flex gap-4 align-items-center">
            <Link className=' text-primary fw-bold ' href="#" >
              Home
            </Link>

            <Link href="#" >
              About
            </Link>
            <Button color='primary'> Live Online Classes </Button>
            {!isAuthenticated ? <Button color='secondary' onClick={() => setIsopen(true)} >Sign in </Button> : <Button color='secondary' onClick={signOutUser} >Sign out </Button>}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header