import { Navbar } from "@/components/Navbar";

export default function LostAndFoundPage() {
    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans pt-16">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[80vh] text-center">

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-full mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-emerald-600 dark:text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 8.25h6.75l-2.589 2.774m-2.247 2.407L16.25 18l-3.321-4.733" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white mb-6">Lost & Found</h1>
                <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed mb-12">
                    This section is currently under construction. Stay tuned as we build a dedicated platform to reunite lost items with their owners across the campus!
                </p>

            </div>
        </main>
    );
}
