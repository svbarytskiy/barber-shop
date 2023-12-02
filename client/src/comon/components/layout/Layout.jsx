import React from 'react'
import Navbar from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
    return (
        <>
            <div className='container mx-auto'>
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}