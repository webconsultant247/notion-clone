import { ArrowLeftCircle } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="size-12" />
      <h1 className="font-bold">Get Started with creating a new document</h1>
    </main>
  );
};

export default page;
