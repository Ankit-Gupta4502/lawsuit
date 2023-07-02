import React, { useState } from 'react'
const Header = dynamic(() => import("./Header"), { ssr: false })
import Footer from './Footer'
import Auth from '../Auth/Auth'
import dynamic from 'next/dynamic'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsopen] = useState(false)

  return (
    <div >
      <Header setIsopen={setIsopen} />
      {children}
      <Footer />
      <Auth isOpen={isOpen} setIsOpen={setIsopen} />
    </div>
  )
}

export default Layout