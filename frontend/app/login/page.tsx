"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticlesBackground } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { BorderBeam } from "@/components/ui/border-beam";
import { useAuth } from "@/components/auth-context";
import { Shield, CheckCircle } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();

  const handleGoogleLogin = () => {
    login();
    router.push("/");
  };

  if (isLoggedIn) {
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
                {"You're already signed in!"}
              </h2>
              <p className="text-sm text-muted-foreground">
                You can now post items and access all features.
              </p>
              <button
                onClick={() => router.push("/")}
                className="rounded-full bg-primary px-6 py-3 text-sm font-heading font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go to Homepage
              </button>
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
      <ParticlesBackground className="fixed inset-0 z-0" quantity={50} />

      <main className="relative z-10 flex min-h-[80vh] items-center justify-center px-4 pt-20">
        <BlurFade delay={0.2}>
          <div className="relative flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border border-border bg-card/80 p-10 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-heading text-2xl font-black">C</span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                <TextAnimate
                  type="blurInUp"
                  by="character"
                  delay={0.1}
                  duration={0.3}
                >
                  Campora
                </TextAnimate>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in with your Google account to post items, report lost
                possessions, and connect with your campus community.
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleLogin}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-sans font-medium text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or browse freely</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/marketplace")}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-accent"
              >
                Marketplace
              </button>
              <button
                onClick={() => router.push("/lost-and-found")}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-accent"
              >
                Lost & Found
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-2 rounded-lg bg-accent/50 p-3">
              <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                We use Google authentication to ensure a secure, campus-focused
                community. Your data is never shared with third parties.
              </p>
            </div>

            <BorderBeam
              size={250}
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
