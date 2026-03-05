import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col md:flex-row max-w-[100vw] overflow-hidden pt-16">

                {/* Marketplace Half */}
                <Link
                    href="/marketplace"
                    className="group relative flex-1 min-h-[50vh] md:min-h-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-900 p-8 text-center transition-all duration-700 md:hover:flex-[1.2]"
                >
                    {/* Abstract aesthetic layer */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"></div>
  
                    <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-4">
                        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl mb-8 shadow-2xl border border-white/20 transform -rotate-3 transition-transform duration-500 group-hover:rotate-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.809c0-.859-.652-1.594-1.5-1.653l-3.15-.218m-6-1.042V3.75c0-.83.67-1.5 1.5-1.5h1.5c.83 0 1.5.67 1.5 1.5v3.428m-6 1.04v7.922m-6-1.042l3.15-.218c.848-.059 1.5.677 1.5 1.536v8.406" />
                            </svg>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">Marketplace</h2>
                        <p className="text-xl text-blue-100 max-w-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            Buy and sell electronics, textbooks, furniture, and more directly with students.
                        </p>

                        <div className="mt-10 px-8 py-3.5 bg-white text-indigo-700 rounded-full font-bold shadow-lg opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                            Enter Marketplace
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* Lost & Found Half */}
                <Link
                    href="/lost-and-found"
                    className="group relative flex-1 min-h-[50vh] md:min-h-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 p-8 text-center transition-all duration-700 md:hover:flex-[1.2]"
                >
                    {/* Abstract aesthetic layer */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-10 right-10 w-64 h-64 bg-teal-400 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"></div>
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"></div>

                    <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-4">
                        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl mb-8 shadow-2xl border border-white/20 transform rotate-3 transition-transform duration-500 group-hover:rotate-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-emerald-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 8.25h6.75l-2.589 2.774m-2.247 2.407L16.25 18l-3.321-4.733" />
                            </svg>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">Lost & Found</h2>
                        <p className="text-xl text-teal-100 max-w-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            Help reunite lost items with their owners or report something you've misplaced.
                        </p>

                        <div className="mt-10 px-8 py-3.5 bg-white text-teal-700 rounded-full font-bold shadow-lg opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                            Browse Lost & Found
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </Link>

            </div>
        </main>
    );
}
