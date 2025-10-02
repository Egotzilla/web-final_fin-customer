import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function BoxBasic() {
  return (
    <main className="container mx-auto p-6">
      <Box component="section" className="border border-gray-800 m-5 p-8 text-center rounded-lg">
        <h1 className="text-4xl text-violet-950 mb-6">Fin-Customer App</h1>
        <div className="flex justify-center">
          <Link href="/customer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">
            Customer Management
          </Link>
          {/* <Link href="/product" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">
            Products
          </Link>
          <Link href="/category" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">
            Categories
          </Link> */}
        </div>
      </Box>
    </main>
  );
}
