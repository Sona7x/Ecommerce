"use client";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap flex-row">
      {products.map((item, id) => (
        <ProductCard key={item.id} id={item.id} item={item} />
      ))}
    </div>
  );
};

export default Home;
