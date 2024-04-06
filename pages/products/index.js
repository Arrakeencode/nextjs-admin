import Link from "next/link"
import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export default function Products() {
    const { data: session } = useSession()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('/api/products').then(response => {

            setProducts(response.data);
            setLoading(false);
        });
    }, []);

    const productsToDisplay = products
    if(session && session.userData.isAdmin) {
    return <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Tout les produits</h1>

            <p className="mt-1.5 text-sm text-gray-500">Regarder les stats de votre busness</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
              href={'/products/newProduct'}
            >
              <span className="text-sm font-medium"> Créé un produit </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

        <div className="overflow-x-auto mx-auto px-4">
            {products.length === 0 ? (<>
                    <hr className="my-8 h-px border-0 bg-gray-300" />
                    <p className="w-full text-center">No products available.</p>
                </>
            ) : (
                <>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
                        <thead>
                        {/* Table headers here */}
                        </thead>
                        {productsToDisplay.map((product, index) => (
                            <tbody className="divide-y divide-gray-200" key={product._id}>
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">

                                    {product.images && product.images.map((image, index) => (

                                        <img key={image._id}
                                            className="h-10 w-10 mr-2 rounded-full object-cover object-center bg-gray-200"
                                            src={image}
                                            alt={product.title}
                                        />

                                    ))}

                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 truncate max-w-md">{product.title}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 truncate max-w-md">{product.description}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{formatPrice(product.price)} €</td>
                                <td className="whitespace-nowrap px-4 py-2 gap-4 ">
                                    <Link
                                        href={'/products/edit/' + product._id}
                                        className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                    <td className="whitespace-nowrap px-4 py-2 gap-4">
                                        <Link
                                            href={'/products/delete/' + product._id}
                                            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>

                </>
            )}
        </div>

   </>
}}