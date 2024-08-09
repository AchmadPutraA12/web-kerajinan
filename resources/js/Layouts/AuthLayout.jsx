import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout