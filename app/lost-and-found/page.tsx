import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, Plus, AlertTriangle, CheckCircle } from "lucide-react";

const CATEGORIES = ["All", "Electronics", "Clothing", "Accessories", "Books", "Keys", "Other"];

export default async function LostAndFoundPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string; q?: string }>;
}) {
    const { type, q } = await searchParams;
    const session = await auth();

    const activeType = type || "all";

    const typeFilter =
        activeType === "lost" ? "LOST" :
            activeType === "found" ? "FOUND" :
                undefined;

    const items = await prisma.item.findMany({
        where: {
            type: typeFilter as any ?? { in: ["LOST", "FOUND"] as any },
            status: "ACTIVE",
            ...(q
                ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { description: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {}),
        },
        orderBy: { id: "desc" } as any,
        include: {
            postedBy: { select: { name: true, email: true } },
        },
    });

    const lostCount = items.filter((i) => i.type === "LOST").length;
    const foundCount = items.filter((i) => i.type === "FOUND").length;
    const totalCount = items.length;

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28">
                {/* Header */}
                <div className="mb-10 text-center">
                    <BlurFade delay={0.1}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                            <MapPin className="size-3.5" />
                            Lost & Found
                        </span>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                            Campus Lost & Found
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.4}>
                        <p className="mt-4 text-muted-foreground">
                            Lost something? Check here. Found something? Help return it to its owner.
                        </p>
                    </BlurFade>
                </div>

                {/* Tabs & Search */}
                <BlurFade delay={0.5}>
                    <div className="mb-8 flex flex-col gap-4">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 p-1.5 backdrop-blur-sm">
                            {[
                                { value: "all", label: "All Items", count: totalCount },
                                { value: "lost", label: "Lost", count: lostCount },
                                { value: "found", label: "Found", count: foundCount },
                            ].map(({ value, label, count }) => (
                                <a
                                    key={value}
                                    href={`/lost-and-found?type=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                                    className={cn(
                                        "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-sans font-medium transition-all",
                                        activeType === value
                                            ? value === "lost"
                                                ? "bg-red-500/90 text-white shadow-sm"
                                                : value === "found"
                                                    ? "bg-emerald-500/90 text-white shadow-sm"
                                                    : "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {value === "lost" && <AlertTriangle className="size-3.5" />}
                                    {value === "found" && <CheckCircle className="size-3.5" />}
                                    {label}
                                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">{count}</span>
                                </a>
                            ))}
                        </div>

                        {/* Search */}
                        <form className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                type="text"
                                name="q"
                                defaultValue={q}
                                placeholder="Search by item or description..."
                                className="w-full rounded-xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <input type="hidden" name="type" value={activeType} />
                        </form>
                    </div>
                </BlurFade>

                {/* Results */}
                <BlurFade delay={0.6}>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Showing {items.length} item{items.length !== 1 ? "s" : ""}
                        {activeType !== "all" ? ` (${activeType})` : ""}
                    </p>
                </BlurFade>

                {items.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => {
                            const isLost = item.type === "LOST";
                            return (
                                <BlurFade key={item.id} delay={0.1 + i * 0.04} inView>
                                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                                        {/* Type Banner */}
                                        <div
                                            className={cn(
                                                "flex h-40 items-center justify-center bg-gradient-to-br",
                                                isLost
                                                    ? "from-red-500/20 to-orange-500/20"
                                                    : "from-emerald-500/20 to-teal-500/20"
                                            )}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span
                                                    className={cn(
                                                        "rounded-full px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider",
                                                        isLost
                                                            ? "bg-red-500/20 text-red-400"
                                                            : "bg-emerald-500/20 text-emerald-400"
                                                    )}
                                                >
                                                    {isLost ? "Lost" : "Found"}
                                                </span>
                                                <span className="text-xs font-sans text-foreground/50">{item.category}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 p-4">
                                            <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                                {item.description}
                                            </p>

                                            <div className="border-t border-border pt-3">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>Reported by: {item.postedBy.name ?? item.postedBy.email?.split("@")[0]}</span>
                                                    {session ? (
                                                        <span className="text-primary">{item.postedBy.email}</span>
                                                    ) : (
                                                        <a
                                                            href="/login"
                                                            className="italic hover:text-primary transition-colors"
                                                        >
                                                            Login to see contact
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <BorderBeam
                                            size={150}
                                            duration={12}
                                            colorFrom={isLost ? "#ef4444" : "#10b981"}
                                            colorTo={isLost ? "#f97316" : "#14b8a6"}
                                            borderWidth={1}
                                            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                    </div>
                                </BlurFade>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-20 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                            <MapPin className="size-7 text-muted-foreground" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                            No items found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {q ? "Try adjusting your search." : "No reports yet — be the first to report!"}
                        </p>
                    </div>
                )}

                {/* Report CTA */}
                <BlurFade delay={0.3} inView>
                    <div className="mt-16 rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm">
                        <h3 className="font-heading text-2xl font-bold text-foreground">
                            Found something on campus?
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            {session
                                ? "Help a fellow student — report a found item or post about something you lost."
                                : "Sign in with your @dau.ac.in account to report lost or found items."}
                        </p>
                        <div className="mt-6">
                            <Link
                                href={session ? "/sell" : "/api/auth/login?callbackUrl=/sell"}
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-heading font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                <Plus className="size-4" />
                                {session ? "Report an Item" : "Sign In to Report"}
                            </Link>
                        </div>
                    </div>
                </BlurFade>
            </main>

            <Footer />
        </div>
    );
}
