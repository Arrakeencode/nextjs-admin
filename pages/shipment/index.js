
import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";


export default function Command() {
    const [Command, setCommand] = useState([]);
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('/api/command').then(response => {

            setCommand(response.data);
            setLoading(false);
        });
    }, []);

    const updateShippedStatus = async (id) => {
        await axios.put('/api/command', { shipped: true, _id: id });
        // Actualiser les données après la mise à jour
        axios.get('/api/command').then(response => {
            setCommand(response.data);
        });
    };

    const CommandToDisplay = Command
    console.log(CommandToDisplay)
    if(session && session.userData.isAdmin) {
    return <>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Tout les produits</h1>

                    <p className="mt-1.5 text-sm text-gray-500">Regarder les stats de votre busness</p>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">

                </div>
            </div>
        </div>

        <div className="overflow-x-auto mx-auto px-4">
            {Command.length === 0 ? (<>
                    <hr className="my-8 h-px border-0 bg-gray-300" />
                    <p className="w-full text-center">No products available.</p>
                </>
            ) : (
                <>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
                        <thead>
                        {/* Table headers here */}
                        </thead>
                        {Command.map((product, index) => (
                            <tbody className="divide-y divide-gray-200" key={product._id}>
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {product.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {product.address}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {product.city}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {product.zip}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {product.country}
                                </td>
                                {product.line_items.map((item, index) => (
                                    <div key={item._id} className="flex">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                                        {item.quantity}

                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                                        {item.price_data.product_data.name}
                                    </td>
                                    </div>
                                ))}
                                <td className="whitespace-nowrap px-4 py-2 gap-4 flex">

                                </td>
                                <td>
                                    <button onClick={() => updateShippedStatus(product._id)}>Mark as Shipped</button>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </>
            )}
        </div>

    </>
}  else if (session && !session.userData.isAdmin) {
        return<>
            <div className="bg-black flex justify-center items-center h-screen">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-bold">Vous ne pouvez pas accéder à cette page</h1>
                </div>
            </div>
        </>
    }
}
