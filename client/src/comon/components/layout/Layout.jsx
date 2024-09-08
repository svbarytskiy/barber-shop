import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='mx-auto min-h-screen mt-[90px] container mx-auto'>
                {children}
            </main>
            <Footer />
        </>
    )
}