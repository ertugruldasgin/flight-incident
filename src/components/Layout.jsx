import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 transition-colors duration-300 isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 dark:hidden">
        <div className="absolute inset-0 opacity-20 dark:hidden bg-[linear-gradient(to_right,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 dark:hidden bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="fixed top-0 -left-1/4 w-1/2 h-1/2 bg-sky-500 dark:bg-sky-400 rounded-full blur-3xl opacity-20"></div>
        <div className="fixed bottom-0 -right-1/4 w-1/2 h-1/2 bg-red-500 dark:bg-red-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
