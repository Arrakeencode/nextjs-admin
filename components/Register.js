import React, { useState } from "react";

export default function Register ({setLogin})  {
    const [error, setError] = useState("");

    const handleRegister = () => {
        setLogin(true);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 4) {
            setError("Password is invalid");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (res.status === 400) {
                setError("This email is already registered");
            }
            if (res.status === 200) {
                setError("");
            }
        } catch (error) {
            setError("Error, try again");
        }
    };

    return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                    <h1 className="text-4xl text-center font-semibold mb-8 text-white">Crée un compte</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Valider
                        </button>
                        <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                    </form>
                    <div className="text-center text-gray-500 mt-4">- OU -</div>
                    <button
                        className="block text-center text-blue-500 hover:underline mt-2 w-full"
                        onClick={handleRegister}
                    >
                        Se connecter avec un compte éxistant
                    </button>
                </div>
            </div>
    );
};