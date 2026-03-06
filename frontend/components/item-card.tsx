"use client";

import { cn } from "@/lib/utils";
import type { MarketplaceItem, LostFoundItem } from "@/lib/mock-data";
import { BorderBeam } from "@/components/ui/border-beam";
import { MapPin, Clock, Tag, User } from "lucide-react";

const GRADIENT_PALETTES = [
  "from-violet-500/30 to-purple-600/30",
  "from-purple-500/30 to-fuchsia-500/30",
  "from-indigo-500/30 to-violet-500/30",
  "from-fuchsia-500/30 to-pink-500/30",
  "from-violet-600/30 to-indigo-500/30",
  "from-purple-400/30 to-violet-600/30",
];

function getGradient(index: number) {
  return GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];
}

export function MarketplaceCard({
  item,
  index,
}: {
  item: MarketplaceItem;
  index: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div
        className={cn(
          "flex h-48 items-center justify-center bg-gradient-to-br",
          getGradient(index)
        )}
      >
        <div className="flex flex-col items-center gap-2 text-foreground/50">
          <Tag className="size-8" />
          <span className="text-xs font-sans">{item.category}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-2">
            {item.title}
          </h3>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 font-heading text-sm font-bold text-primary">
            ${item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="size-3" />
            <span>{item.seller}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3" />
            <span>{item.date}</span>
          </div>
        </div>
        <span className="inline-flex w-fit rounded-md bg-accent px-2 py-0.5 text-xs font-sans text-accent-foreground">
          {item.condition}
        </span>
      </div>
      <BorderBeam
        size={150}
        duration={12}
        colorFrom="#7c3aed"
        colorTo="#c084fc"
        borderWidth={1}
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}

export function LostFoundCard({
  item,
  index,
  isLoggedIn,
}: {
  item: LostFoundItem;
  index: number;
  isLoggedIn: boolean;
}) {
  const isLost = item.type === "lost";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div
        className={cn(
          "flex h-40 items-center justify-center bg-gradient-to-br",
          isLost
            ? "from-red-500/20 to-orange-500/20"
            : "from-emerald-500/20 to-teal-500/20"
        )}
      >
        <div className="flex flex-col items-center gap-2 text-foreground/50">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider",
              isLost
                ? "bg-red-500/20 text-red-400"
                : "bg-emerald-500/20 text-emerald-400"
            )}
          >
            {item.type}
          </span>
          <span className="text-xs font-sans">{item.category}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3" />
            <span>{item.date}</span>
          </div>
          {isLoggedIn ? (
            <span className="text-xs text-primary">{item.contact}</span>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Login to see contact
            </span>
          )}
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
  );
}
