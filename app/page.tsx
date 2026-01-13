"use client";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-around gap-y-10">
      {products.map((item, id) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Home;
// import React from "react";

// const Home = () => {
//   return <div></div>;
// };

// export default Home;
