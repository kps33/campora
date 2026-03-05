import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { archiveItem } from "@/app/actions/itemActions";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: itemId } = await params;

    const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
            postedBy: {
                select: { id: true, name: true, email: true },
            },
        },
    });

    if (!item) {
        notFound();
    }

    const session = await auth();
    const isOwner = session?.user?.email === item.postedBy.email;

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12 font-sans">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row">

                    {/* Images Gallery */}
                    <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-neutral-800/50 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                        {item.imageUrls.map((url, idx) => (
                            <div key={idx} className="min-w-full h-[300px] md:h-[500px] relative snap-center">
                                <img
                                    src={url}
                                    alt={`${item.title} - Image ${idx + 1}`}
                                    className="object-cover w-full h-full"
                                />
                                {/* Overlay gradient for premium feel */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                        ))}
                        {item.imageUrls.length === 0 && (
                            <div className="w-full h-[300px] md:h-[500px] flex flex-col items-center justify-center text-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 opacity-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span>No images provided</span>
                            </div>
                        )}

                        {/* Status Badge */}
                        <div className="absolute top-5 right-5 z-10">
                            <span className={`px-4 py-1.5 text-xs font-black tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md ${item.status === "ACTIVE" ? "bg-emerald-500 text-white" :
                                item.status === "SOLD" ? "bg-neutral-800 text-white" : "bg-blue-600 text-white"
                                }`}>
                                {item.status}
                            </span>
                        </div>

                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-10 w-full md:w-1/2 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-3 leading-tight">
                                {item.title}
                            </h1>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
                                ${item.price?.toFixed(2)}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-4 py-1.5 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                </svg>
                                {item.category}
                            </span>
                            <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-4 py-1.5 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                {item.condition}
                            </span>
                        </div>

                        <div className="prose max-w-none text-neutral-600 dark:text-neutral-400 mb-8 whitespace-pre-line leading-relaxed flex-grow">
                            {item.description}
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 mb-8 mt-auto">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                {item.postedBy.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Listed By</p>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">{item.postedBy.name || "Unknown User"}</p>
                            </div>
                        </div>

                        {/* Owner Actions */}
                        {isOwner && (
                            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={`/item/${item.id}/edit`}
                                    className="flex-1 flex justify-center items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    Edit Listing
                                </Link>

                                {item.status !== "ARCHIVED" && (
                                    <form action={async () => {
                                        "use server";
                                        await archiveItem(item.id);
                                    }} className="flex-1">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center items-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 font-bold px-6 py-3.5 rounded-xl transition-all active:scale-95"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            Archive Listing
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
