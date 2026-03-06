import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { BorderBeam } from "@/components/ui/border-beam";
import { Lock, ArrowRight } from "lucide-react";

/**
 * /post is now a redirect to /sell (the real sell form).
 * If not logged in → redirect to Google sign-in with callbackUrl=/sell.
 */
export default async function PostPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/login?callbackUrl=/sell");
    }

    redirect("/sell");
}
