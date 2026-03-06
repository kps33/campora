import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { BlurFade } from "@/components/ui/blur-fade";
import { ItemCard } from "@/components/ItemCard";
import { ShoppingBag, Tag, Edit, Archive } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { archiveItem } from "@/app/actions/itemActions";

export default async function MyItemsPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/login");
    }

    const items = await prisma.item.findMany({
        where: {
            postedBy: { email: session.user.email },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 pb-12 pt-28">
                <div className="mb-10 text-center">
                    <BlurFade delay={0.1}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                            <Tag className="size-3.5" />
                            My Listings
                        </span>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Your Posted Items</h1>
                    </BlurFade>
                </div>

                <BlurFade delay={0.4}>
                    {items.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item, i) => (
                                <ItemCard key={item.id} item={item} index={i} href={`/item/${item.id}`}>
                                    {/* Action Buttons */}
                                    <div className="flex grid-cols-2 divide-x divide-border/50 bg-background/50 backdrop-blur-sm rounded-b-2xl overflow-hidden">
                                        <Link href={`/item/${item.id}/edit`} className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold hover:bg-muted/80 transition-colors text-blue-500 hover:text-blue-400">
                                            <Edit className="size-4" /> Edit
                                        </Link>
                                        {item.status !== "ARCHIVED" && (
                                            <form action={async () => {
                                                "use server";
                                                await archiveItem(item.id);
                                            }} className="flex-1">
                                                <button type="submit" className="w-full h-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold hover:bg-red-500/10 transition-colors text-red-500 hover:text-red-400">
                                                    <Archive className="size-4" /> Archive
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </ItemCard>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-20 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                                <ShoppingBag className="size-7 text-muted-foreground" />
                            </div>
                            <h3 className="font-heading text-lg font-semibold">No listings yet</h3>
                            <p className="text-sm text-muted-foreground">You haven't posted any items for sale.</p>
                            <Link href="/sell" className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                                Sell an Item
                            </Link>
                        </div>
                    )}
                </BlurFade>
            </main>
        </div>
    );
}
