export default function HomeSkeleton() {
    return (
        <div className="flex flex-col bg-[#FDF4ED] min-h-full pb-4 animate-pulse">
            {/* Header skeleton */}
            <div className="px-4 pt-6 pb-2 flex items-center justify-between">
                <div>
                    <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-6 w-40 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <div className="h-10 w-10 bg-gray-200 rounded-full" />
                </div>
            </div>

            {/* SearchBar skeleton */}
            <div className="px-4 py-3">
                <div className="h-11 bg-white rounded-xl" />
            </div>

            {/* Filter tabs skeleton */}
            <div className="px-4 py-2 flex gap-2">
                {[80, 110, 90, 70].map((w, i) => (
                    <div key={i} className="h-8 rounded-full bg-gray-200 shrink-0" style={{ width: w }} />
                ))}
            </div>

            {/* Restaurant section 1 skeleton */}
            <div className="px-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <div className="h-5 w-28 bg-gray-200 rounded mb-1" />
                        <div className="h-3 w-36 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                {/* Featured card skeleton */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex">
                        <div className="w-28 h-28 bg-gray-200 shrink-0" />
                        <div className="p-3 flex-1 flex flex-col gap-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>

                {/* Product grid skeleton */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="h-32 bg-gray-200" />
                            <div className="p-3 flex flex-col gap-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                <div className="h-3 w-full bg-gray-200 rounded" />
                                <div className="h-3 w-1/3 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restaurant section 2 skeleton */}
            <div className="px-4 mt-6">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <div className="h-5 w-40 bg-gray-200 rounded mb-1" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex">
                        <div className="w-28 h-28 bg-gray-200 shrink-0" />
                        <div className="p-3 flex-1 flex flex-col gap-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
