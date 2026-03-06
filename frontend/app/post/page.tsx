"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticlesBackground } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { useAuth } from "@/components/auth-context";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  Upload,
  Lock,
  ArrowRight,
} from "lucide-react";

type PostType = "sell" | "lost" | "found";

function AuthGate() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticlesBackground className="fixed inset-0 z-0" quantity={40} />

      <main className="relative z-10 flex min-h-[80vh] items-center justify-center px-4 pt-20">
        <BlurFade delay={0.2}>
          <div className="relative flex max-w-md flex-col items-center gap-6 rounded-2xl border border-border bg-card/80 p-10 text-center backdrop-blur-xl">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="size-7 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Sign In Required
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You need to sign in with your Google account to post items on
              Campora. Browsing is always free!
            </p>
            <Link href="/login">
              <InteractiveHoverButton
                text="Sign In with Google"
                icon={<ArrowRight className="size-5" />}
                className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
              />
            </Link>
            <BorderBeam
              size={200}
              duration={12}
              colorFrom="#7c3aed"
              colorTo="#c084fc"
            />
          </div>
        </BlurFade>
      </main>

      <Footer />
    </div>
  );
}

const POST_TYPES: { value: PostType; label: string; icon: typeof ShoppingBag; color: string }[] = [
  {
    value: "sell",
    label: "Sell an Item",
    icon: ShoppingBag,
    color: "bg-primary/10 text-primary border-primary/30",
  },
  {
    value: "lost",
    label: "Report Lost",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-500 border-red-500/30",
  },
  {
    value: "found",
    label: "Report Found",
    icon: CheckCircle,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  },
];

export default function PostPage() {
  const { isLoggedIn } = useAuth();
  const [postType, setPostType] = useState<PostType>("sell");
  const [submitted, setSubmitted] = useState(false);

  if (!isLoggedIn) return <AuthGate />;

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <ParticlesBackground className="fixed inset-0 z-0" quantity={40} />
        <main className="relative z-10 flex min-h-[80vh] items-center justify-center px-4 pt-20">
          <BlurFade delay={0.2}>
            <div className="relative flex max-w-md flex-col items-center gap-6 rounded-2xl border border-border bg-card/80 p-10 text-center backdrop-blur-xl">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="size-7 text-emerald-500" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Item Posted!
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your listing has been submitted successfully. Fellow students
                will be able to see it shortly.
              </p>
              <div className="flex gap-3">
                <Link href="/marketplace">
                  <InteractiveHoverButton
                    text="View Marketplace"
                    className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                  />
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-border bg-card px-6 py-3 text-sm font-heading font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Post Another
                </button>
              </div>
              <BorderBeam
                size={200}
                duration={12}
                colorFrom="#10b981"
                colorTo="#14b8a6"
              />
            </div>
          </BlurFade>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticlesBackground className="fixed inset-0 z-0" quantity={20} />

      <main className="relative z-10 mx-auto max-w-2xl px-4 pb-12 pt-28">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            <TextAnimate type="blurInUp" by="word" delay={0.1} duration={0.35}>
              Post an Item
            </TextAnimate>
          </h1>
          <BlurFade delay={0.3}>
            <p className="mt-3 text-muted-foreground">
              Sell something, report a lost item, or help someone find their
              stuff.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.4}>
          <div className="relative rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-xl sm:p-8">
            {/* Post Type Selector */}
            <div className="mb-8 grid grid-cols-3 gap-3">
              {POST_TYPES.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setPostType(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-sans font-medium transition-all",
                    postType === value
                      ? color
                      : "border-border text-muted-foreground hover:border-border hover:bg-accent/50"
                  )}
                >
                  <Icon className="size-5" />
                  <span className="text-xs sm:text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-sans font-medium text-foreground">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    postType === "sell"
                      ? 'e.g., "Calculus Textbook - 8th Edition"'
                      : postType === "lost"
                        ? 'e.g., "Blue Water Bottle with Stickers"'
                        : 'e.g., "Found AirPods near Library"'
                  }
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-sans font-medium text-foreground">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the item in detail..."
                  className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Category
                  </label>
                  <select className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {postType === "sell" ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-sans font-medium text-foreground">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-sans font-medium text-foreground">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Where was it lost/found?"
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}
              </div>

              {/* Image Upload Placeholder */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-sans font-medium text-foreground">
                  Image (optional)
                </label>
                <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border bg-accent/30 p-8 text-center transition-colors hover:border-primary/30">
                  <Upload className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <InteractiveHoverButton
                text={
                  postType === "sell"
                    ? "List Item for Sale"
                    : postType === "lost"
                      ? "Submit Lost Report"
                      : "Submit Found Report"
                }
                icon={<ArrowRight className="size-5" />}
                className="mt-2 w-full bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
              />
            </form>

            <BorderBeam
              size={200}
              duration={15}
              colorFrom="#7c3aed"
              colorTo="#c084fc"
            />
          </div>
        </BlurFade>
      </main>

      <Footer />
    </div>
  );
}
