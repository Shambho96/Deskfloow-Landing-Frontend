import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 [animation:wr_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
        {children}
      </main>
      <Footer />
    </>
  );
}
