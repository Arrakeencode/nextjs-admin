import { useSession } from "next-auth/react"
import Register from "@/components/Register";
import Login from "@/components/Login";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const {data: session} = useSession()
  const [login, setLogin] = useState(false);
  const [order, setOrder] = useState([]);
  const [command, setCommand] = useState([]);


  useEffect(() => {
    if (session && session.userData.isAdmin) {
      axios.get('/api/command', { params: { shipped: true } }).then(response => {
        setOrder(response.data);
      });

      axios.get('/api/command', { params: { shipped: false } }).then(response => {
        setCommand(response.data);
      });
    }
  }, [session]);

  const orderPrice = order.reduce((acc, orders) => {
    const totalOrderPrice = orders.line_items.reduce((acc, item) => acc + (item.quantity * item.price_data.unit_amount / 100), 0);
    return acc + totalOrderPrice;
  }, 0)
  const commandPrice = command.reduce((acc, commands) => {
    const totalCommandPrice = commands.line_items.reduce((acc, item) => acc + (item.quantity * item.price_data.unit_amount / 100), 0);
    return acc + totalCommandPrice;
  }, 0);
  const totalPrice = orderPrice + commandPrice

  if (session && session.userData.isAdmin) {
    return <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Bienvenue sur la partie Admin <span>{session.user.email}</span> !</h1>

            <p className="mt-1.5 text-sm text-gray-500">Regarder les stats de votre busness</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                href="/products"
            >
              <span className="text-sm font-medium"> Voir les produits </span>

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

            <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                href="https://ecommerce-nextjs-arrakeencodes-projects.vercel.app/"
            >
              <span className="text-sm font-medium"> Voir le magasin </span>

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
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Cumul du prix des ventes</dt>

                <dd className="text-4xl font-extrabold text-tennis md:text-5xl">{totalPrice} €</dd>
              </div>

              <div className="flex flex-col rounded-lg bg-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total des commandes</dt>

                <dd className="text-4xl font-extrabold text-tennis md:text-5xl">{order.length + command.length}</dd>
              </div>

              <div className="flex flex-col rounded-lg bg-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Commandes à envoyer</dt>

                <dd className="text-4xl font-extrabold text-tennis md:text-5xl">{command.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
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


  return (<>
        {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
      </>
  );
}
