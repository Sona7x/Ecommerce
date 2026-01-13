"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Id = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState(null);

  const fetchProductDetail = async () => {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/${params.id}`
    );
    setProductDetail(data);
  };
  useEffect(() => {
    fetchProductDetail();
  }, []);
  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row gap-10 px-10 max-w-[90%] m-auto">
      <div className="bg-gray-100 p-16 max-w-100 w-full">
        <img
          className="w-full"
          src={productDetail.image}
          alt={productDetail.title}
        />
      </div>
      <div className="gap-4 flex flex-col justify-center items-start">
        <span className="text-md italic font-medium text-gray-600">
          Category: {productDetail.category}
        </span>
        <h3 className="font-bold text-2xl font-roboto text-[#111]">
          {productDetail.title}
        </h3>
        <span className="font-semibold text-pink-800 text-3xl">
          {productDetail.price} $
        </span>
        <p className="font-inter text-base mb-3 text-[#111]">
          {productDetail.description}
        </p>
        <Button variant="default">ADD TO CART</Button>
      </div>
    </div>
  );
};

export default Id;
