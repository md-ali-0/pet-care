import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-3.5 px-6 flex-grow mt-[68px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
