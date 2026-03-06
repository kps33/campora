import { Navbar } from "@/components/Navbar";
import { SellFormClient } from "@/components/SellFormClient";

export default function SellPage() {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <SellFormClient />
        </div>
    );
}
