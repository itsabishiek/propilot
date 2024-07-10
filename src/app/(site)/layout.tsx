import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
