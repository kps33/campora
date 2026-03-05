import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import FeedItem from "@/components/FeedItem";
import Link from "next/link";
import { Prisma } from "@/app/generated/prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parsing Search Parameters for Task 5: Filters & Search natively integrated into Feed UI
  const sp = await searchParams; // Next.js 15+ search params are promises natively sometimes, but we'll await out of caution

  const query = typeof sp.q === "string" ? sp.q : undefined;
  const categoryStr = typeof sp.category === "string" ? sp.category : undefined;
  const conditionStr = typeof sp.condition === "string" ? sp.condition : undefined;
  const minPrice = typeof sp.min === "string" ? parseFloat(sp.min) : undefined;
  const maxPrice = typeof sp.max === "string" ? parseFloat(sp.max) : undefined;

  // Build Prisma Where Clause dynamically
  const whereClause: Prisma.ItemWhereInput = {
    type: "SALE",
    status: "ACTIVE",
  };

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (categoryStr) {
    whereClause.category = categoryStr;
  }

  if (conditionStr) {
    whereClause.condition = conditionStr;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.price = {};
    if (minPrice !== undefined && !isNaN(minPrice)) whereClause.price.gte = minPrice;
    if (maxPrice !== undefined && !isNaN(maxPrice)) whereClause.price.lte = maxPrice;
  }

  // Fetch Items from Database
  const items = await prisma.item.findMany({
    where: whereClause,
    orderBy: { id: "desc" }, // newest first (CUIDs sort chronologically by default usually, but creating a createdAt field is better long term)
    include: {
      postedBy: {
        select: { name: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Dynamic Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-10 md:p-16 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
                Campus Marketplace
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl font-medium">
                Buy, sell, and discover items within your campus community safely and securely.
              </p>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                <span>Sell an Item</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            </div>

            <div className="hidden md:block">
              {/* Decorative element representing shopping/items */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-blue-100 opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.809c0-.859-.652-1.594-1.5-1.653l-3.15-.218m-6-1.042V3.75c0-.83.67-1.5 1.5-1.5h1.5c.83 0 1.5.67 1.5 1.5v3.428m-6 1.04v7.922m-6-1.042l3.15-.218c.848-.059 1.5.677 1.5 1.536v8.406" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Filter UI (Glassmorphism inspired) */}
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-neutral-200/60 dark:border-neutral-800 mb-10 sticky top-24 z-20 transition-all hover:shadow-md">
          <form action="/" method="GET" className="flex flex-col xl:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search for textbooks, electronics..."
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <select name="category" defaultValue={categoryStr || ""} className="w-full md:w-auto py-3 px-4 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none font-medium text-neutral-700 dark:text-neutral-300">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Textbooks">Textbooks</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>

              <select name="condition" defaultValue={conditionStr || ""} className="w-full md:w-auto py-3 px-4 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none font-medium text-neutral-700 dark:text-neutral-300">
                <option value="">All Conditions</option>
                <option value="New">✨ New</option>
                <option value="Like New">🌟 Like New</option>
                <option value="Good">👍 Good</option>
                <option value="Fair">👌 Fair</option>
              </select>

              <div className="flex gap-2 w-full md:w-auto">
                <input type="number" name="min" defaultValue={minPrice} placeholder="Min $" className="w-1/2 md:w-24 py-3 px-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                <input type="number" name="max" defaultValue={maxPrice} placeholder="Max $" className="w-1/2 md:w-24 py-3 px-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>

              <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                <Link href="/" className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium">
                  Reset
                </Link>
                <button type="submit" className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all font-medium active:scale-95 shadow-md shadow-blue-500/30">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Feed Grid */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 shadow-sm mt-8">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-neutral-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">No items found</h3>
            <p className="text-neutral-500 mt-2 max-w-sm text-center">We couldn't find any items matching your current filters. Try adjusting your search criteria.</p>
            <Link href="/" className="mt-6 text-blue-600 font-medium hover:underline decoration-2 underline-offset-4">
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {items.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}