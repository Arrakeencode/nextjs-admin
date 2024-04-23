import Link from "next/link"
import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import Spinner from "@/components/Spinner";


export default function Order() {
    const { data: session } = useSession()
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const currentOrder = order.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(order.length / ordersPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        axios.get('/api/order').then(response => {

            setOrder(response.data);
            setLoading(false);
        });
    }, []);

    if(session && session.userData.isAdmin) {
    return <>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Toutes les commandes expédiées</h1>

                    <p className="mt-1.5 text-sm text-gray-500">Archives des commandes</p>
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
            order.length === 0 ? (<>
                    <hr className="my-8 h-px border-0 bg-gray-300" />
                    <p className="w-full text-center">Aucune commande disponible</p>
                </>
            ) : (
                <>
                    <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
                        <thead>
                        {/* Table headers here */}
                        </thead>
                            <tbody className="divide-y divide-gray-200">
                            {currentOrder.map((order, index) => (
                            <tr key={order._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {order.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {order.address}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {order.city}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {order.zip}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {order.country}
                                </td>
                                {order.line_items.map((item) => (
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
                                    <Link
                                        href={'/order/delete/' + order._id}
                                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 pb-3 pt-3"
                                    >
                                        Supprimer
                                    </Link>
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