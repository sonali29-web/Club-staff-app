import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#100719] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#160823]/95 via-[#241037]/90 to-[#100719]/95" />

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-700/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-64 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </div>
    </main>
  );
}
