import { Link } from "react-router-dom";
import React from 'react'

const Public = () => {
    const content = (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome to <span className="whitespace-nowrap">collins Repairs!</span>
                </h1>
            </header>
            <main className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="mb-4 text-gray-700">
                    Located in Beautiful Downtown Nairobi City, collins Repairs provides a trained staff ready to meet your tech repair needs.
                </p>
                <address className="mb-4 text-gray-700 not-italic">
                    <p>collins Repairs</p>
                    <p>555  Ruiru Drive</p>
                    <p>Nairobi,City, CA 12345</p>
                    <a className="text-blue-500 hover:underline" href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <p className="text-gray-700">collins kemboi</p>
            </main>
            <footer className="mt-8">
                <Link className="text-blue-500 hover:underline" to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content;
}

export default Public;
