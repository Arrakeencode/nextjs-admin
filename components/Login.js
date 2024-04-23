import {signIn} from "next-auth/react";

export default function LoginPage({setLogin}) {
    async function handleFormSubmit(e) {
        const email = e.target[0].value;
        const password = e.target[1].value;
        e.preventDefault();

        await signIn("credentials", { email, password, callbackUrl: "/" });
        setLogin(false);

    }

    const handleRegister = () => {
        setLogin(false);
    };

    return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                    <h1 className="text-4xl text-center font-semibold mb-8 text-white">Se connecter</h1>
                    <form onSubmit={handleFormSubmit}>
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
                            Connexion
                        </button>
                    </form>
                    <div className="text-center text-gray-500 mt-4">- OU -</div>
                    <button onClick={handleRegister}
                        className="block text-center text-blue-500 hover:underline mt-2 w-full"
                    >
                        Créer un compte
                    </button>
                </div>
            </div>
)}