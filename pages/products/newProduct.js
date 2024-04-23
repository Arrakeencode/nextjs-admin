import Product from "@/components/Product";
import {useSession} from "next-auth/react";

export default function NewProduct(){
    const { data: session } = useSession()
    if(session && session.userData.isAdmin) {
    return (
        <>
            <section className="p-4">
                <div className="sm:flex sm:items-center sm:justify-center">
                    <div className="text-center sm:text-left">
                        <p className="mt-1.5 text-lg text-red-500">
                            Créer un nouveau produit
                        </p>
                    </div>
                </div>

                <hr class="my-8 h-px border-0 bg-gray-300" />
                <div className="my-10 max-sm:my-12">
                    <Product />
                </div>
            </section>
        </>
    );
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