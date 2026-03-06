"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LostFoundCard } from "@/components/item-card";
import { ParticlesBackground } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { LOST_FOUND_ITEMS } from "@/lib/mock-data";
import { useAuth } from "@/components/auth-context";
import { cn } from "@/lib/utils";
import { Search, MapPin, AlertTriangle, CheckCircle, Plus } from "lucide-react";

type Tab = "all" | "lost" | "found";

export default function LostAndFoundPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  const filtered = LOST_FOUND_ITEMS.filter((item) => {
    const matchesTab =
      activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const lostCount = LOST_FOUND_ITEMS.filter((i) => i.type === "lost").length;
  const foundCount = LOST_FOUND_ITEMS.filter((i) => i.type === "found").length;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticlesBackground className="fixed inset-0 z-0" quantity={25} />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28">
        {/* Header */}
        <div className="mb-10 text-center">
          <BlurFade delay={0.1}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
              <MapPin className="size-3.5" />
              Lost & Found
            </span>
          </BlurFade>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            <TextAnimate type="blurInUp" by="word" delay={0.15} duration={0.35}>
              Campus Lost & Found
            </TextAnimate>
          </h1>
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
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-sans font-medium transition-all",
                  activeTab === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All Items
                <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs">
                  {LOST_FOUND_ITEMS.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("lost")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-sans font-medium transition-all",
                  activeTab === "lost"
                    ? "bg-red-500/90 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <AlertTriangle className="size-3.5" />
                Lost
                <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs">
                  {lostCount}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("found")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-sans font-medium transition-all",
                  activeTab === "found"
                    ? "bg-emerald-500/90 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <CheckCircle className="size-3.5" />
                Found
                <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs">
                  {foundCount}
                </span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by item, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </BlurFade>

        {/* Results count */}
        <BlurFade delay={0.6}>
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            {activeTab !== "all" ? ` (${activeTab})` : ""}
          </p>
        </BlurFade>

        {/* Items Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <BlurFade key={item.id} delay={0.1 + i * 0.05} inView>
                <LostFoundCard item={item} index={i} isLoggedIn={isLoggedIn} />
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

        {/* Report CTA */}
        <BlurFade delay={0.3} inView>
          <div className="mt-16 rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Found something on campus?
            </h3>
            <p className="mt-2 text-muted-foreground">
              {isLoggedIn
                ? "Help a fellow student out -- report a found item or post about something you lost."
                : "Sign in with Google to report found items or post about something you lost."}
            </p>
            <div className="mt-6">
              <Link href={isLoggedIn ? "/post" : "/login"}>
                <InteractiveHoverButton
                  text={isLoggedIn ? "Report an Item" : "Sign In to Report"}
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
