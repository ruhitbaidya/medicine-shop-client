"use client";
import CheckoutForm from "@/components/CheckOut/CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_KEY as string);
const PaymentPage = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <div className="w-[100%] lg:w-[60%] mx-auto px-[20px]">
        <Elements stripe={stripePromise}>
          <h2 className="text-center text-3xl mb-[20px]">
            Payment Your Amount
          </h2>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
