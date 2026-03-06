import { auth } from "@/auth";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
    const session = await auth();
    const user = session?.user
        ? {
            name: session.user.name ?? null,
            email: session.user.email ?? null,
            image: session.user.image ?? null,
        }
        : null;

    return <NavbarClient user={user} />;
}
