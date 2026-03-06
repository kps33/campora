import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { archiveItem } from "@/app/actions/itemActions";
import { ImageGalleryClient } from "@/components/ImageGalleryClient";

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

            <div className="max-w-5xl mx-auto px-0 sm:px-5 lg:px-6">
                <div className="bg-background sm:rounded-3xl sm:border border-border/50 flex flex-col md:flex-row min-h-[500px] shadow-sm hover:shadow-xl transition-shadow duration-300">

                    {/* Left: Images Gallery (Auto-Cycling Client Component) */}
                    <div className="w-full md:w-3/5 md:border-r border-border/50 bg-neutral-50 dark:bg-neutral-900/30">
                        <ImageGalleryClient images={item.imageUrls} title={item.title} status={item.status} />
                    </div>

                    {/* Right: Details Section */}
                    <div className="w-full md:w-2/5 flex flex-col bg-background">
                        <div className="p-5 md:p-6 flex-grow flex flex-col">

                            {/* Brand / Category */}
                            <div className="mb-2 flex items-center justify-between">
                                <h2 className="text-base font-bold uppercase tracking-[0.2em] text-primary/80">
                                    {item.category}
                                </h2>
                                <span className="inline-flex items-center rounded-sm bg-accent/40 px-2.5 py-1 text-xs font-bold uppercase text-accent-foreground border border-border/40 hover:bg-accent/60 transition-colors">
                                    {item.condition}
                                </span>
                            </div>

                            {/* Title & Price Header */}
                            <div className="mb-5 pb-5 border-b border-border/40 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <h1 className="text-2xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-100 leading-tight flex-1">
                                    {item.title}
                                </h1>
                                <div className="flex flex-col items-start sm:items-end shrink-0">
                                    <div className="inline-flex items-center shrink-0 rounded-xl bg-primary/10 dark:bg-primary/20 px-4 py-1.5 font-heading text-2xl font-black text-primary border border-primary/20 shadow-sm hover:scale-105 hover:bg-primary/20 transition-all duration-300">
                                        ₹{item.price?.toFixed(0)}
                                    </div>
                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium">Inclusive of all taxes</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8 flex-grow">
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Product Details
                                </h3>
                                <div className="prose prose-base max-w-none text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed text-base">
                                    {item.description}
                                </div>
                            </div>

                            {/* Seller & Meta Details (Clean) */}
                            <div className="mb-4 pt-4 border-t border-border/50">
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400 mb-3">Listing Info</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    <div>
                                        <span className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">Posted By</span>
                                        <span className="font-semibold text-neutral-800 dark:text-neutral-100 hover:text-primary transition-colors cursor-default">{item.postedBy.name || "Unknown User"}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">Posted On</span>
                                        <span className="font-semibold text-neutral-800 dark:text-neutral-100 font-mono text-xs">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<br />
                                            <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                                                {new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Sticky Action Footer */}
                        <div className="p-5 md:p-6 border-t border-border/50 bg-background/80 backdrop-blur-md sticky bottom-0 z-20">
                            {/* Owner Actions */}
                            {isOwner && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href={`/item/${item.id}/edit`}
                                        className="flex-1 flex justify-center items-center gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold px-5 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 uppercase tracking-wide text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
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
                                                className="w-full flex justify-center items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:text-red-600 font-bold px-5 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 uppercase tracking-wide text-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                                Archive
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* Buyer Actions */}
                            {!isOwner && session?.user && item.status === "ACTIVE" && (
                                <form action={async () => {
                                    "use server";
                                    const { purchaseItem } = await import("@/app/actions/itemActions");
                                    await purchaseItem(item.id);
                                }}>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 bg-[#ff3f6c] hover:bg-[#e0355f] text-white font-bold px-5 py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(255,63,108,0.39)] hover:shadow-[0_6px_20px_rgba(255,63,108,0.5)] hover:-translate-y-0.5 active:scale-95 uppercase tracking-wide text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        Add to Bag / Purchase
                                    </button>
                                </form>
                            )}
                            {!session?.user && item.status === "ACTIVE" && (
                                <Link href="/api/auth/login" className="w-full flex justify-center items-center gap-2 bg-foreground text-background font-bold px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 uppercase tracking-wide text-sm">
                                    Sign in to Purchase
                                </Link>
                            )}
                            {!isOwner && item.status !== "ACTIVE" && (
                                <div className="w-full flex justify-center items-center gap-2 bg-muted text-muted-foreground font-bold px-6 py-4 rounded-xl uppercase tracking-wide text-sm cursor-not-allowed border border-border/50">
                                    Item {item.status}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
