"use client";

import { useState } from "react";
import { createSellItem } from "@/app/actions/itemActions";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tag, DollarSign, Image as ImageIcon, Sparkles } from "lucide-react";

export function SellFormClient() {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);
        setFieldErrors({});

        images.forEach((url) => {
            formData.append("imageUrls", url);
        });

        const result = await createSellItem(null, formData);

        if (result && result.error) {
            setError(result.error);
            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }
            setIsSubmitting(false);
        } else {
            router.push("/my-items");
        }
    }

    const handleUploadSuccess = (urls: string[]) => {
        setImages(urls);
    };

    return (
        <main className="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-32">
            <BlurFade delay={0.1}>
                <div className="mb-10 text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                        <Sparkles className="size-4" />
                        Seller Portal
                    </span>
                    <h1 className="font-heading text-4xl font-bold sm:text-5xl tracking-tight text-balance mb-4">
                        List an Item for Sale
                    </h1>
                    <p className="text-muted-foreground text-lg text-balance max-w-xl mx-auto">
                        Turn your unused textbooks, electronics, and furniture into cash on the exclusive campus marketplace.
                    </p>
                </div>
            </BlurFade>

            <BlurFade delay={0.2}>
                <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl overflow-hidden group">

                    {error && (
                        <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 mb-8 rounded-xl flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-8 relative z-10">
                        {/* Basic Info */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                    <Tag className="size-4 text-primary" /> Item Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm outline-none font-medium placeholder:text-muted-foreground"
                                    placeholder="What are you selling?"
                                />
                                {fieldErrors.title && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.title[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm outline-none resize-y font-medium leading-relaxed placeholder:text-muted-foreground"
                                    placeholder="Provide details like size, defects, or reasons for selling..."
                                />
                                {fieldErrors.description && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.description[0]}</p>}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-muted/30 border border-border">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Category</label>
                                <select name="category" required className="w-full bg-background border border-border p-3.5 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm outline-none font-medium text-foreground">
                                    <option value="">Select Category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Textbooks">Textbooks</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Other">Other</option>
                                </select>
                                {fieldErrors.category && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.category[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Condition</label>
                                <select name="condition" required className="w-full bg-background border border-border p-3.5 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm outline-none font-medium text-foreground">
                                    <option value="">Select Condition</option>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                                {fieldErrors.condition && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.condition[0]}</p>}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <DollarSign className="size-4 text-emerald-500" /> Price (₹)
                            </label>
                            <div className="relative max-w-xs">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-muted-foreground font-bold">₹</span>
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="w-full bg-background border border-border pl-9 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm outline-none font-bold text-lg"
                                    placeholder="0.00"
                                />
                            </div>
                            {fieldErrors.price && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.price[0]}</p>}
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                <ImageIcon className="size-4 text-primary" /> Photos
                            </label>
                            <div className="rounded-2xl border-2 border-dashed border-border p-2 bg-background/50 hover:bg-muted/50 transition-colors">
                                <ImageUpload onUploadSuccess={handleUploadSuccess} maxImages={4} />
                            </div>
                            {fieldErrors.imageUrls && <p className="text-red-500 text-xs mt-2 font-medium">{fieldErrors.imageUrls[0]}</p>}
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t border-border">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.2)] text-lg font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Listing...
                                    </span>
                                ) : "Post Listing"}
                            </button>
                        </div>
                    </form>

                    {/* Hover Border Beam */}
                    <BorderBeam size={250} duration={12} colorFrom="#7c3aed" colorTo="#c084fc" borderWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </BlurFade>
        </main>
    );
}
