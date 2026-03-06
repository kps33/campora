"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, Plus, Tag, ShoppingBag } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Lost & Found", href: "/lost-and-found" },
];

interface NavbarClientProps {
    user: {
        name: string | null;
        email: string | null;
        image: string | null;
    } | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
        : user?.email?.[0]?.toUpperCase() ?? "U";

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-primary/10 bg-background/70 shadow-sm shadow-primary/5 backdrop-blur-2xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-heading text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-500 via-primary to-fuchsia-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-fuchsia-500 group-hover:via-violet-400 group-hover:to-primary drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                        Campora
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative rounded-xl px-5 py-2.5 text-md font-sans font-semibold transition-all duration-200",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <AnimatedThemeToggler />

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-2 text-sm transition-all hover:border-primary/40 hover:shadow-sm"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name ?? "User"}
                                        className="size-7 rounded-full object-cover ring-1 ring-primary/20"
                                    />
                                ) : (
                                    <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-xs font-heading font-bold text-white">
                                        {initials}
                                    </div>
                                )}
                                <span className="hidden font-sans text-sm font-medium text-foreground sm:inline">
                                    {user.name ?? user.email}
                                </span>
                            </button>

                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-border bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                                        <Link
                                            href="/my-items"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-accent"
                                        >
                                            <Tag className="size-4 text-primary" />
                                            My Listings
                                        </Link>
                                        <Link
                                            href="/purchases"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-accent"
                                        >
                                            <ShoppingBag className="size-4 text-primary" />
                                            Past Purchases
                                        </Link>
                                        <Link
                                            href="/sell"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-accent"
                                        >
                                            <Plus className="size-4 text-primary" />
                                            Sell an Item
                                        </Link>
                                        <a
                                            href="/api/auth/signout"
                                            className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-sans font-medium text-destructive transition-colors hover:bg-destructive/10"
                                        >
                                            <LogOut className="size-4" />
                                            Log Out
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <a
                            href="/api/auth/login"
                            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-violet-600 px-5 py-2.5 text-sm font-heading font-semibold text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] md:inline-flex"
                        >
                            Sign In
                        </a>
                    )}

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex size-10 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground transition-colors hover:border-primary/30 md:hidden"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-1 p-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "rounded-lg px-4 py-3 text-sm font-sans font-medium transition-colors",
                                    pathname === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link
                                    href="/sell"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-4 py-3 text-sm font-sans font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                    Sell an Item
                                </Link>
                                <Link
                                    href="/my-items"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-4 py-3 text-sm font-sans font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                    My Listings
                                </Link>
                                <Link
                                    href="/purchases"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-4 py-3 text-sm font-sans font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                    Past Purchases
                                </Link>
                                <a
                                    href="/api/auth/signout"
                                    className="rounded-lg px-4 py-3 text-left text-sm font-sans font-medium text-destructive hover:bg-destructive/10"
                                >
                                    Log Out
                                </a>
                            </>
                        ) : (
                            <a
                                href="/api/auth/login"
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-heading font-semibold text-primary-foreground"
                            >
                                Sign In with Google
                            </a>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
