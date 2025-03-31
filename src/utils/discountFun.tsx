import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Discount = ({ price, disPrice }: { price: number; disPrice: number }) => {
  return (
    <div className="flex  items-center gap-[15px]">
      <div className="flex justify-between items-center gap-[5px]">
        <div>
          <FaBangladeshiTakaSign />
        </div>
        <div>{price - Math.round(price / 100) * disPrice}</div>
      </div>
      <div className="flex justify-between items-center gap-[5px] line-through">
        <div>
          <FaBangladeshiTakaSign />
        </div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default Discount;
