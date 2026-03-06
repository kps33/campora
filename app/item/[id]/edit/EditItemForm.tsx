"use client";

import { useState } from "react";
import { editItem } from "@/app/actions/itemActions";
import ImageUpload from "@/components/ImageUpload";
import { Item } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

export default function EditItemForm({ item }: { item: Item }) {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<string[]>(item.imageUrls);
    const router = useRouter();

    const handleUploadSuccess = (urls: string[]) => {
        setImages(urls);
    };

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);
        setFieldErrors({});

        images.forEach((url) => {
            formData.append("imageUrls", url);
        });

        const result = await editItem(item.id, formData);

        if (result && result.error) {
            setError(result.error);
            if (result.fieldErrors) setFieldErrors(result.fieldErrors);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 relative xl:-mx-8">
            {/* Decorative Corner */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

            <form action={handleSubmit} className="space-y-6 relative z-10">
                {error && (
                    <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Item Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        required
                        className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none font-medium"
                    />
                    {fieldErrors.title && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.title[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        defaultValue={item.description}
                        required
                        rows={5}
                        className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none resize-y font-medium leading-relaxed"
                    />
                    {fieldErrors.description && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.description[0]}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Category</label>
                        <div className="relative">
                            <select name="category" defaultValue={item.category} required className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none appearance-none cursor-pointer font-medium text-neutral-700 dark:text-neutral-200">
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
                            <select name="condition" defaultValue={item.condition} required className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none appearance-none cursor-pointer font-medium text-neutral-700 dark:text-neutral-200">
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
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Price (₹)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <span className="text-neutral-500 font-medium">₹</span>
                        </div>
                        <input
                            type="number"
                            name="price"
                            defaultValue={item.price || ""}
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 pl-8 pr-3.5 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none font-medium"
                        />
                    </div>
                    {fieldErrors.price && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.price[0]}</p>}
                </div>

                <div className="pt-2">
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">Item Images</label>

                    <div className="rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        {images.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-3">Current Images ({images.length})</p>
                                <div className="flex gap-3 mb-4 overflow-x-auto pb-2 snap-x">
                                    {images.map((url, idx) => (
                                        <img key={idx} src={url} alt={`img-${idx}`} className="w-24 h-24 object-cover rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm snap-center shadow-sm" />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImages([])}
                                    className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                    Clear & Upload New
                                </button>
                            </div>
                        )}

                        {images.length === 0 && (
                            <ImageUpload onUploadSuccess={handleUploadSuccess} maxImages={4} />
                        )}
                    </div>
                    {fieldErrors.imageUrls && <p className="text-red-500 text-sm mt-1.5 font-medium">{fieldErrors.imageUrls[0]}</p>}
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3.5 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-center"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-center flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Saving...
                            </span>
                        ) : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}
