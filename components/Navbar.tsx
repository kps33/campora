import Link from "next/link";
import { signIn, auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
    const session = await auth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                            Campora
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/marketplace" className="text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Marketplace
                            </Link>
                            <Link href="/lost-and-found" className="text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                Lost & Found
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-8">
                        {session ? (
                            <LogoutButton />
                        ) : (
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("google");
                                }}
                            >
                                <button
                                    type="submit"
                                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
                                >
                                    Log in with Google
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
