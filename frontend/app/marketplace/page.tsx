"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketplaceCard } from "@/components/item-card";
import { ParticlesBackground } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MARKETPLACE_ITEMS, CATEGORIES } from "@/lib/mock-data";
import { useAuth } from "@/components/auth-context";
import { cn } from "@/lib/utils";
import { Search, Plus, ShoppingBag } from "lucide-react";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  const filtered = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticlesBackground className="fixed inset-0 z-0" quantity={25} />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28">
        {/* Header */}
        <div className="mb-10 text-center">
          <BlurFade delay={0.1}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
              <ShoppingBag className="size-3.5" />
              Campus Marketplace
            </span>
          </BlurFade>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            <TextAnimate type="blurInUp" by="word" delay={0.15} duration={0.35}>
              Browse Campus Listings
            </TextAnimate>
          </h1>
          <BlurFade delay={0.4}>
            <p className="mt-4 text-muted-foreground">
              Find textbooks, electronics, furniture, and more from fellow students.
            </p>
          </BlurFade>
        </div>

        {/* Search & Filters */}
        <BlurFade delay={0.5}>
          <div className="mb-8 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-sans transition-all",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground backdrop-blur-sm"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Results count */}
        <BlurFade delay={0.6}>
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
        </BlurFade>

        {/* Items Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <BlurFade key={item.id} delay={0.1 + i * 0.05} inView>
                <MarketplaceCard item={item} index={i} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <Search className="size-7 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              No items found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Sell CTA */}
        <BlurFade delay={0.3} inView>
          <div className="mt-16 rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Have something to sell?
            </h3>
            <p className="mt-2 text-muted-foreground">
              {isLoggedIn
                ? "Post your item and connect with campus buyers instantly."
                : "Sign in with Google to list your items on the marketplace."}
            </p>
            <div className="mt-6">
              <Link href={isLoggedIn ? "/post" : "/login"}>
                <InteractiveHoverButton
                  text={isLoggedIn ? "Post an Item" : "Sign In to Sell"}
                  icon={<Plus className="size-5" />}
                  className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                />
              </Link>
            </div>
          </div>
        </BlurFade>
      </main>

      <Footer />
    </div>
  );
}
