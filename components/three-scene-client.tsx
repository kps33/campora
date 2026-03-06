"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
    ),
});

export default ThreeScene;
