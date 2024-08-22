import React from 'react'
import Navbar from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='mx-auto min-h-screen mt-[84px]'>
                {children}
            </div>
            <Footer />
        </>
    )
}