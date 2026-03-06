import { auth } from "@/auth";
import ThreeScene from "@/components/three-scene-client";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { Marquee } from "@/components/ui/marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import {
    ShoppingBag,
    Search,
    Shield,
    ArrowRight,
    Star,
    Users,
    Package,
    MapPin,
} from "lucide-react";



function TestimonialCard({
    name,
    text,
    role,
}: {
    name: string;
    text: string;
    role: string;
}) {
    return (
        <div className="relative mx-2 flex w-80 shrink-0 flex-col gap-3 rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
                {'"'}{text}{'"'}
            </p>
            <div className="flex items-center gap-3 border-t border-border pt-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
                    {name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                    <p className="text-sm font-heading font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                </div>
            </div>
        </div>
    );
}

const FEATURES = [
    {
        icon: ShoppingBag,
        title: "Buy & Sell",
        description:
            "List textbooks, electronics, furniture, and more. Trade directly with students on your campus.",
    },
    {
        icon: Search,
        title: "Lost & Found",
        description:
            "Lost something? Report it. Found something? Help reunite it with its owner. Community-powered recovery.",
    },
    {
        icon: Shield,
        title: "Campus Secure",
        description:
            "Google-only authentication with @dau.ac.in domain ensures only verified campus members can post and trade.",
    },
];

const STATS = [
    { icon: Users, value: "2,500+", label: "Active Students" },
    { icon: Package, value: "8,000+", label: "Items Traded" },
    { icon: MapPin, value: "150+", label: "Items Returned" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
];

export default async function LandingPage() {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section — split layout */}
            <section className="relative min-h-screen overflow-hidden">
                {/* 3D scene on the right half */}
                <div className="absolute inset-y-0 right-0 z-[1] w-full md:w-[55%]">
                    <ThreeScene />
                </div>
                {/* gradient fades scene into background leftward */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-r from-background from-40% via-background/80 to-transparent" />

                <div className="relative z-[3] flex min-h-screen items-center">
                    <div className="w-full max-w-6xl mx-auto px-6 pb-20 pt-32 lg:px-16">
                        <div className="max-w-lg">
                            <BlurFade delay={0.1}>
                                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                    Now live for your campus
                                </span>
                            </BlurFade>

                            <h1 className="mt-4 font-heading text-6xl font-bold leading-tight tracking-tight text-foreground sm:text-7xl md:text-8xl">
                                <TextAnimate type="blurInUp" by="character" delay={0.2} duration={0.4}>
                                    Campora
                                </TextAnimate>
                            </h1>

                            <BlurFade delay={0.6}>
                                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                                    Your Campus. Your Marketplace. Your Community. Buy, sell, and find lost items — all in one place,
                                    exclusively for <strong>@dau.ac.in</strong> students.
                                </p>
                            </BlurFade>

                            <BlurFade delay={0.8}>
                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <Link href="/marketplace">
                                        <InteractiveHoverButton
                                            text="Browse Marketplace"
                                            className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                                        />
                                    </Link>
                                    {isLoggedIn ? (
                                        <Link href="/sell">
                                            <InteractiveHoverButton
                                                text="Sell an Item"
                                                icon={<ShoppingBag className="size-5" />}
                                            />
                                        </Link>
                                    ) : (
                                        <a href="/api/auth/login">
                                            <InteractiveHoverButton
                                                text="Sign In with Google"
                                                icon={<ArrowRight className="size-5" />}
                                            />
                                        </a>
                                    )}
                                </div>
                            </BlurFade>

                            {/* Stats hidden for now
                    <BlurFade delay={1.0}>
                        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center gap-1 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm"
                                >
                                    <stat.icon className="size-4 text-primary" />
                                    <span className="font-heading text-xl font-bold text-foreground">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </BlurFade>
                    */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24">
                <div className="mx-auto max-w-5xl px-4">
                    <BlurFade inView>
                        <div className="mb-16 text-center">
                            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider text-primary">
                                Features
                            </span>
                            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                Everything you need on campus
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                From selling textbooks to finding lost items, Campora has you covered.
                            </p>
                        </div>
                    </BlurFade>

                    <div className="grid gap-6 sm:grid-cols-3">
                        {FEATURES.map((feature, i) => (
                            <BlurFade key={feature.title} delay={i * 0.15} inView>
                                <div className="group relative flex flex-col items-start gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <feature.icon className="size-6" />
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {feature.description}
                                    </p>
                                    <BorderBeam
                                        size={120}
                                        duration={10}
                                        colorFrom="#7c3aed"
                                        colorTo="#c084fc"
                                        borderWidth={1}
                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                    />
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative border-y border-border bg-accent/30 py-24">
                <div className="mx-auto max-w-5xl px-4">
                    <BlurFade inView>
                        <div className="mb-16 text-center">
                            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider text-primary">
                                How It Works
                            </span>
                            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                Simple, fast, and campus-exclusive
                            </h2>
                        </div>
                    </BlurFade>
                    <div className="grid gap-8 sm:grid-cols-3">
                        {[
                            {
                                step: "01",
                                title: "Browse Freely",
                                desc: "Explore marketplace listings and lost & found posts without logging in.",
                            },
                            {
                                step: "02",
                                title: "Sign In with Google",
                                desc: "Quick, secure sign in with your @dau.ac.in Google account. One click.",
                            },
                            {
                                step: "03",
                                title: "Post & Connect",
                                desc: "Sell items, report lost possessions, or help return found items to their owners.",
                            },
                        ].map((item, i) => (
                            <BlurFade key={item.step} delay={i * 0.15} inView>
                                <div className="flex flex-col gap-3">
                                    <span className="font-heading text-4xl font-black text-primary/20">
                                        {item.step}
                                    </span>
                                    <h3 className="font-heading text-xl font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative py-24 overflow-hidden">
                <div className="mx-auto max-w-5xl px-4 mb-12">
                    <BlurFade inView>
                        <div className="text-center">
                            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider text-primary">
                                Testimonials
                            </span>
                            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                Loved by students
                            </h2>
                        </div>
                    </BlurFade>
                </div>
                <Marquee pauseOnHover className="[--duration:30s]">
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="mt-4 [--duration:35s]">
                    {[...TESTIMONIALS].reverse().map((t) => (
                        <TestimonialCard key={t.name + "-rev"} {...t} />
                    ))}
                </Marquee>
            </section>

            {/* CTA Section */}
            <section className="relative py-24">
                <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
                    <BlurFade inView>
                        <div className="relative rounded-3xl border border-primary/20 bg-card/80 p-12 backdrop-blur-xl">
                            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                {isLoggedIn
                                    ? "Welcome back! Ready to post?"
                                    : "Ready to join your campus community?"}
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                {isLoggedIn
                                    ? "List items for sale or browse the latest listings from your campus."
                                    : "Start browsing listings or sign in to sell, report, and connect with fellow students."}
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                <Link href="/marketplace">
                                    <InteractiveHoverButton
                                        text="Explore Marketplace"
                                        className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                                        icon={<ArrowRight className="size-5" />}
                                    />
                                </Link>
                                {isLoggedIn ? (
                                    <Link href="/sell">
                                        <InteractiveHoverButton
                                            text="Sell an Item"
                                            icon={<ShoppingBag className="size-5" />}
                                        />
                                    </Link>
                                ) : (
                                    <a href="/api/auth/login">
                                        <InteractiveHoverButton text="Sign In with Google" />
                                    </a>
                                )}
                            </div>
                            <BorderBeam size={250} duration={15} colorFrom="#7c3aed" colorTo="#c084fc" />
                        </div>
                    </BlurFade>
                </div>
            </section>

            <Footer />
        </div>
    );
}
