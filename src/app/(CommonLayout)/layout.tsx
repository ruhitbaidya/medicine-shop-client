import Footer from "@/components/shaired/Footer";
import Navbar from "@/components/shaired/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-[80px]">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
