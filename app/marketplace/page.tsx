import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { ItemCard } from "@/components/ItemCard";
import { ShoppingBag, Plus, Tag, User, Clock } from "lucide-react";

const GRADIENT_PALETTES = [
  "from-violet-500/30 to-purple-600/30",
  "from-purple-500/30 to-fuchsia-500/30",
  "from-indigo-500/30 to-violet-500/30",
  "from-fuchsia-500/30 to-pink-500/30",
  "from-violet-600/30 to-indigo-500/30",
  "from-purple-400/30 to-violet-600/30",
];

const CATEGORIES = ["All", "Electronics", "Textbooks", "Furniture", "Clothing", "Other"];

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const session = await auth();

  const items = await prisma.item.findMany({
    where: {
      type: "SALE",
      status: "ACTIVE",
      ...(session?.user?.email ? { postedBy: { email: { not: session.user.email } } } : {}),
      ...(category && category !== "All" ? { category } : {}),
      ...(q
        ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      postedBy: { select: { name: true } },
    },
  });

  const activeCategory = category || "All";

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28">
        {/* Header */}
        <div className="mb-10 text-center">
          <BlurFade delay={0.1}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
              <ShoppingBag className="size-3.5" />
              Campus Marketplace
            </span>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Browse Campus Listings
            </h1>
          </BlurFade>
          <BlurFade delay={0.4}>
            <p className="mt-4 text-muted-foreground">
              Find textbooks, electronics, furniture, and more from fellow students.
            </p>
          </BlurFade>
        </div>

        {/* Search & Filters */}
        <BlurFade delay={0.5}>
          <form className="mb-8 flex flex-col gap-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search items..."
                className="w-full rounded-xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input type="hidden" name="category" value={activeCategory} />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={`/marketplace?category=${encodeURIComponent(cat)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-sans transition-all",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground backdrop-blur-sm"
                  )}
                >
                  {cat}
                </a>
              ))}
            </div>
          </form>
        </BlurFade>

        {/* Results */}
        <BlurFade delay={0.6}>
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {items.length} item{items.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
        </BlurFade>

        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <BlurFade key={item.id} delay={0.1 + i * 0.04} inView>
                <ItemCard item={item} index={i} href={`/item/${item.id}`} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">No items found</h3>
            <p className="text-sm text-muted-foreground">
              {q || activeCategory !== "All"
                ? "Try adjusting your search or filter criteria."
                : "No active listings yet. Be the first to sell something!"}
            </p>
            <a href="/marketplace" className="text-sm text-primary underline underline-offset-2">
              Clear filters
            </a>
          </div>
        )}

        {/* Sell CTA */}
        <BlurFade delay={0.3} inView>
          <div className="mt-16 rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Have something to sell?
            </h3>
            <p className="mt-2 text-muted-foreground">
              {session
                ? "Post your item and connect with campus buyers instantly."
                : "Sign in with your @dau.ac.in Google account to list your items."}
            </p>
            <div className="mt-6">
              <Link
                href={session ? "/sell" : "/api/auth/login?callbackUrl=/sell"}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-heading font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="size-4" />
                {session ? "Post an Item" : "Sign In to Sell"}
              </Link>
            </div>
          </div>
        </BlurFade>
      </main>

      <Footer />
    </div>
  );
}