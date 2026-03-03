import { Item } from "@/app/generated/prisma/client";
import Link from "next/link";

interface FeedItemProps {
    item: Item & { postedBy: { name: string | null } };
}

export default function FeedItem({ item }: FeedItemProps) {
    const imageUrl = item.imageUrls.length > 0
        ? item.imageUrls[0]
        : "https://via.placeholder.com/400x300?text=No+Image";

    return (
        <Link href={`/item/${item.id}`} className="group flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md text-neutral-900 dark:text-white px-3 py-1.5 text-sm font-black rounded-lg shadow-sm border border-white/20">
                    ${item.price?.toFixed(2)}
                </div>

                {/* Category Pill floating on hover */}
                <div className="absolute bottom-3 left-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                        {item.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 line-clamp-1 text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                    {item.description}
                </p>

                <div className="flex justify-between items-center text-xs text-neutral-400 dark:text-neutral-500 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{item.condition}</span>
                    </div>
                    <span className="font-medium truncate max-w-[120px]">
                        {item.postedBy.name || "Unknown"}
                    </span>
                </div>
            </div>
        </Link>
    );
}
