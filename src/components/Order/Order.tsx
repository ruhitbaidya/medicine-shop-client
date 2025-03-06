"use client";
import { ContextCreate } from "@/Context/ContextProvide";
import { useContext } from "react";

const OrderPage = () => {
  const { tempOrder } = useContext(ContextCreate);
  console.log(tempOrder);
  return <div>OrderPage</div>;
};

export default OrderPage;
