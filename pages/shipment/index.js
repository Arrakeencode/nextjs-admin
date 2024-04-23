
import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";


export default function Command() {
    const [command, setCommand] = useState([]);
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const commandsPerPage = 6;

    const indexOfLastCommand = currentPage * commandsPerPage;
    const indexOfFirstCommand = indexOfLastCommand - commandsPerPage;

    const currentCommand = command.slice(indexOfFirstCommand, indexOfLastCommand);

    const totalPages = Math.ceil(command.length / commandsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        axios.get('/api/command').then(response => {

            setCommand(response.data);
            setLoading(false);
        });
    }, []);

    const updateShippedStatus = async (id) => {
        try {
            await axios.put('/api/command', { shipped: true, _id: id });
            toast.success("Le statut d'expédition a été mis à jour avec succès.")
            axios.get('/api/command')
                .then(response => {
                    setCommand(response.data);
                })
                .catch(error => {
                    toast.error("Une erreur est survenue lors de la récupération des données après la mise à jour.");
                });
        } catch (error) {
            toast.error("Une erreur est survenue");
        }
    };

    if(session && session.userData.isAdmin) {
    return <>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Toutes les commandes à expédier</h1>

                    <p className="mt-1.5 text-sm text-gray-500">En cours d&apos;envoi</p>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">

                </div>
            </div>
        </div>

        <div className="overflow-x-auto mx-auto px-4">
            {loading ? (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Spinner />
                    </div>
                ) :
            command.length === 0 ? (<>
                    <hr className="my-8 h-px border-0 bg-gray-300" />
                    <p className="w-full text-center">Pas de commande à expédier</p>
                </>
            ) : (
                <>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
                        <thead>
                        {/* Table headers here */}
                        </thead>
                            <tbody className="divide-y divide-gray-200" key={command._id}>
                            {currentCommand.map((command, index) => (
                            <tr key={command._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {command.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {command.address}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {command.city}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {command.zip}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {command.country}
                                </td>
                                {command.line_items.map((item) => (
                                    <div key={item._id} className="flex py-1">
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                                            {item.quantity}

                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                                            {item.price_data.product_data.name}
                                        </td>
                                    </div>
                                ))}
                                <td>
                                    <button className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700" onClick={() => updateShippedStatus(command._id)}>Marqué comme expédié</button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                    </table>
                </div>
                    <div className="flex justify-center mt-8">
                        {Array.from({length: totalPages}, (_, i) => (
                            <button
                                key={i}
                                className={`mx-2 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>

    </>
    } else if (session && !session.userData.isAdmin) {
        return <>
            <div className="bg-black flex justify-center items-center h-screen">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-bold">Vous ne pouvez pas accéder à cette page</h1>
                </div>
            </div>
        </>
    }
}
