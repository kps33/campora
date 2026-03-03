"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sellItemSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Category is required"),
    condition: z.string().min(1, "Condition is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    imageUrls: z.array(z.string().url()).min(1, "At least one image is required"),
});

const editItemSchema = Object.assign({}, sellItemSchema);

export async function createSellItem(prevState: any, formData: FormData) {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "You must be logged in to sell an item." };
    }

    // Get user ID from the database using email
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { error: "User not found in database." };
    }

    const rawFormData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        condition: formData.get("condition"),
        price: formData.get("price"),
        // In a real app with FormData, arrays are tricky. We might pass URLs as a JSON string
        // or as multiple inputs with the same name. Let's assume a comma-separated string for simplicity
        // or multiple inputs.
        imageUrls: formData.getAll("imageUrls"),
    };

    const validatedFields = sellItemSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            error: "Validation failed. Please check your inputs.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { title, description, category, condition, price, imageUrls } = validatedFields.data;

    try {
        const item = await prisma.item.create({
            data: {
                title,
                description,
                category,
                condition,
                price,
                imageUrls,
                type: "SALE",
                status: "ACTIVE",
                postedById: user.id,
            },
        });

        // We can't redirect directly inside a try/catch if it's the standard Next.js redirect
        // so we return success and redirect after.
    } catch (error) {
        console.error("Failed to create item:", error);
        return { error: "Failed to create item in database." };
    }

    revalidatePath("/");
    redirect("/");
}

// Ensure the caller is the owner of the item
async function verifyItemOwnership(itemId: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const item = await prisma.item.findUnique({
        where: { id: itemId },
    });

    if (!user || !item || item.postedById !== user.id) {
        throw new Error("Unauthorized: Only the owner can modify this listing.");
    }

    return { item, user };
}

export async function archiveItem(itemId: string) {
    try {
        await verifyItemOwnership(itemId);

        await prisma.item.update({
            where: { id: itemId },
            data: { status: "ARCHIVED" },
        });

        revalidatePath("/");
        revalidatePath("/dashboard"); // Assuming a dashboard exists or will exist
        return { success: true };
    } catch (error: any) {
        console.error("Archive error:", error);
        return { error: error.message };
    }
}

export async function editItem(itemId: string, formData: FormData) {
    try {
        await verifyItemOwnership(itemId);

        const rawFormData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            condition: formData.get("condition"),
            price: formData.get("price"),
            imageUrls: formData.getAll("imageUrls"),
        };

        const validatedFields = sellItemSchema.safeParse(rawFormData);

        if (!validatedFields.success) {
            return {
                error: "Validation failed.",
                fieldErrors: validatedFields.error.flatten().fieldErrors,
            };
        }

        await prisma.item.update({
            where: { id: itemId },
            data: validatedFields.data,
        });

    } catch (error: any) {
        console.error("Edit error:", error);
        return { error: error.message };
    }

    revalidatePath("/");
    revalidatePath(`/item/${itemId}`);
    redirect(`/item/${itemId}`);
}
