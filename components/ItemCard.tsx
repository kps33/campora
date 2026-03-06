import Link from "next/link";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tag, User, Clock } from "lucide-react";
import { CardImageSliderClient } from "./CardImageSliderClient";

const GRADIENT_PALETTES = [
    "from-violet-500/30 to-purple-600/30",
    "from-purple-500/30 to-fuchsia-500/30",
    "from-indigo-500/30 to-violet-500/30",
    "from-fuchsia-500/30 to-pink-500/30",
    "from-violet-600/30 to-indigo-500/30",
    "from-purple-400/30 to-violet-600/30",
];

export function ItemCard({
    item,
    index,
    href,
    children
}: {
    item: any;
    index: number;
    href: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(124,58,237,0.12)] hover:-translate-y-1.5 flex flex-col">
            <Link href={href} className="block flex-grow flex flex-col">
                {/* Image Section */}
                {item.imageUrls && item.imageUrls.length > 0 ? (
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-muted/50 to-muted flex items-center justify-center">
                        <CardImageSliderClient images={item.imageUrls} title={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Overlay Category & Status Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow-sm border border-white/10">
                                <Tag className="size-3" />
                                {item.category}
                            </span>
                            {item.status && item.status !== "ACTIVE" && (
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase shadow-sm border border-white/10 backdrop-blur-md ${item.status === "SOLD" ? "bg-emerald-500/90 text-white" : "bg-neutral-800/80 text-white"
                                    }`}>
                                    {item.status}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "flex h-48 w-full items-center justify-center bg-gradient-to-br relative overflow-hidden",
                            GRADIENT_PALETTES[(item.id?.charCodeAt(0) || index) % GRADIENT_PALETTES.length]
                        )}
                    >
                        <div className="flex flex-col items-center gap-2 text-foreground/70 relative z-10">
                            <Tag className="size-10 opacity-80 text-foreground" />
                            <span className="text-sm font-sans font-medium">{item.category}</span>
                        </div>
                        <div className="absolute inset-0 bg-background/10" />
                    </div>
                )}

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-5 gap-4">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="font-heading text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-100 line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        {item.price !== null && (
                            <span className="shrink-0 rounded-xl bg-primary/10 dark:bg-primary/20 px-3 py-1 font-heading text-base font-black text-primary border border-primary/20 shadow-sm">
                                ₹{item.price?.toFixed(0)}
                            </span>
                        )}
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-500 line-clamp-2 mt-auto">
                        {item.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-col gap-3 border-t border-border/60 pt-4 mt-2">
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-lg bg-accent/30 dark:bg-accent/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 border border-border/40">
                                {item.condition}
                            </span>
                            {item.postedBy && item.postedBy.name && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-lg">
                                    <User className="size-3.5 text-primary/70" />
                                    <span className="truncate max-w-[100px]">{item.postedBy.name}</span>
                                </span>
                            )}
                        </div>

                        {item.createdAt && (
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground/80 mt-1">
                                <span className="flex items-center">
                                    <Clock className="size-3 mr-1.5 text-primary/50" />
                                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="flex items-center">
                                    {new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {children && (
                <div className="border-t border-border/50 z-10 relative bg-background/30 backdrop-blur-md">
                    {children}
                </div>
            )}

            <BorderBeam
                size={200}
                duration={10}
                colorFrom="#8b5cf6"
                colorTo="#d946ef"
                borderWidth={1.5}
                className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
        </div>
    );
}
