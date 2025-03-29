import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Discount = ({ price, disPrice }: { price: number; disPrice: number }) => {
  return (
    <div className="flex items-end gap-2">
      <p className="flex items-center gap-[5px]">
        <FaBangladeshiTakaSign />
        {price - Math.round(price / 100) * disPrice}
      </p>
      <p className="flex items-center gap-[5px] line-through">
        <FaBangladeshiTakaSign />
        {price}
      </p>
    </div>
  );
};

export default Discount;
