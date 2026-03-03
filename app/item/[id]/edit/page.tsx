import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import EditItemForm from "./EditItemForm";

export default async function EditItemPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user?.email) {
        redirect("/login");
    }

    const itemId = params.id;
    const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
            postedBy: { select: { email: true } }
        }
    });

    if (!item) {
        notFound();
    }

    if (item.postedBy.email !== session.user.email) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 text-red-600 p-8 rounded-lg text-center max-w-md">
                    <h2 className="text-2xl font-bold mb-2">Unauthorized</h2>
                    <p>You do not have permission to edit this listing because you are not the owner.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Edit Listing: {item.title}</h1>
            <EditItemForm item={item} />
        </div>
    );
}
