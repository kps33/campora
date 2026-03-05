"use client";

import { useState } from "react";
import { createSellItem } from "@/app/actions/itemActions";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function SellPage() {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);
        setFieldErrors({});

        // Append our manually managed image array to FormData
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
            // Redirection handled in server action or manually fallback
            router.push("/");
        }
    }

    const handleUploadSuccess = (urls: string[]) => {
        setImages(urls);
    };  

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12 font-sans selection:bg-blue-500 selection:text-white">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                    <div className="mb-10 text-center relative z-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">Sell an Item</h1>
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium">List your item securely on the campus marketplace.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-8 rounded-2xl flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Item Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none font-medium"
                                placeholder="What are you selling?"
                            />
                            {fieldErrors.title && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.title[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={5}
                                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none resize-y font-medium leading-relaxed"
                                placeholder="Provide details like size, defects, or reasons for selling..."
                            />
                            {fieldErrors.description && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.description[0]}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Category</label>
                                <div className="relative">
                                    <select name="category" required className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none appearance-none cursor-pointer font-medium text-neutral-700 dark:text-neutral-200">
                                        <option value="">Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Textbooks">Textbooks</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                                {fieldErrors.category && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.category[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Condition</label>
                                <div className="relative">
                                    <select name="condition" required className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none appearance-none cursor-pointer font-medium text-neutral-700 dark:text-neutral-200">
                                        <option value="">Select Condition</option>
                                        <option value="New">New</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                                {fieldErrors.condition && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.condition[0]}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Price ($)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 font-medium">$</span>
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 pl-8 pr-3.5 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none font-medium"
                                    placeholder="0.00"
                                />
                            </div>
                            {fieldErrors.price && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.price[0]}</p>}
                        </div>

                        <div className="pt-2">
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">Item Images</label>
                            <div className="rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 p-1 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                <ImageUpload onUploadSuccess={handleUploadSuccess} maxImages={4} />
                            </div>
                            {fieldErrors.imageUrls && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.imageUrls[0]}</p>}
                        </div>

                        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Listing Item...
                                    </span>
                                ) : "List Item for Sale"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
