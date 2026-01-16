import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductCard = (props) => {
  const router = useRouter();
  return (
    <div
      key={props.id}
      className="max-w-60 w-full rounded-tl-4xl border border-gray-200 rounded-tr-4xl overflow-hidden"
    >
      <img
        className="w-full h-[225px] object-contain"
        src={props.item.image}
        alt={props.item.title}
      />
      <div className="p-4 pb-5 bg-gray-100 mt-4">
        <h5 className="text-xs italic font-medium mb-2">
          Category: {props.item.category}
        </h5>
        <div className="flex justify-between">
          <h4
            onClick={() => router.push("/product/" + props.item.id)}
            className="line-clamp-2 h-12 font-bold text-base font-roboto text-[#111] cursor-pointer hover:text-pink-900"
          >
            {props.item.title}
          </h4>

          <div className="ml-2">
            <ArrowRight size="18px" />
          </div>
        </div>
        <p className="font-inter font- text-xs mt-2 mb-5 line-clamp-2 text-[#111]">
          {props.item.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-pink-800 text-sm">
            {props.item.price} $
          </span>
          <Button
            onClick={() => router.push("/product/" + props.item.id)}
            variant="outline"
          >
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
