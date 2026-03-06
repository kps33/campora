import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { BlurFade } from "@/components/ui/blur-fade";
import { ItemCard } from "@/components/ItemCard";
import { ShoppingBag, Tag, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PurchasesPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/login");
    }

    const items = await prisma.item.findMany({
        where: {
            buyer: { email: session.user.email },
        },
        orderBy: { updatedAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 pb-12 pt-28">
                <div className="mb-10 text-center">
                    <BlurFade delay={0.1}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                            <CheckCircle2 className="size-3.5" />
                            My Purchases
                        </span>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Your Order History</h1>
                    </BlurFade>
                    <BlurFade delay={0.3}>
                        <p className="mt-4 text-muted-foreground">Items you have secured from the marketplace.</p>
                    </BlurFade>
                </div>

                <BlurFade delay={0.4}>
                    {items.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item, i) => (
                                <ItemCard key={item.id} item={item} index={i} href={`/item/${item.id}`} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-20 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                                <ShoppingBag className="size-7 text-muted-foreground" />
                            </div>
                            <h3 className="font-heading text-lg font-semibold">No purchases yet</h3>
                            <p className="text-sm text-muted-foreground">When you buy an item, it will appear here.</p>
                            <Link href="/marketplace" className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                                Browse Marketplace
                            </Link>
                        </div>
                    )}
                </BlurFade>
            </main>
        </div>
    );
}
