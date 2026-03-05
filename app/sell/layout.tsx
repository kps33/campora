import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default async function SellLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // Protect all /sell routes heavily
    if (!session?.user) {
        redirect("/api/auth/login?callbackUrl=/sell");
    }

    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}
