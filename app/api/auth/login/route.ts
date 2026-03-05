import { signIn } from "@/auth";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const callbackUrl = url.searchParams.get("callbackUrl") || "/";

    // trigger auth to login with google and head back to the original place
    return await signIn("google", { redirectTo: callbackUrl });
}
