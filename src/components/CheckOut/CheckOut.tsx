"use client";
import { ContextCreate } from "@/Context/ContextProvide";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useContext } from "react";
import { toast } from "sonner";
import { postApi } from "../api/apiCom";
const CheckoutForm = () => {
  const router = useRouter();
  const { user, card, count, shippingInfo, setTempOrder, imageUrl } =
    useContext(ContextCreate);
  const sendOrder = async (oId: string) => {
    const medicineId = card.map((item) => {
      return { id: item._id, quantity: item.quantity };
    });
    const order = {
      medicine: medicineId,
      user: user?._id,
      shippingAddress: shippingInfo,
      orderId: oId,
      prescription: imageUrl,
    };
    console.log(order);
    setTempOrder({
      medicine: card,
      user: user?._id,
      shippingAddress: shippingInfo,
      orderId: oId,
    });
    const res = await postApi(
      `${process.env.NEXT_PUBLIC_API_URL}/order`,
      order
    );
    if (res.data) {
      router.push("/order");
    }
  };
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!stripe || !elements) {
      setError("Stripe has not been initialized.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paymentInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: count, currency: "usd" }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch payment information.");
      }

      const data = await res.json();

      const clientSecret: string = data.data.clientSecret.client_secret;
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError("Card element not found.");
        setLoading(false);
        return;
      }

      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { name: "Test User" },
          },
        });

      if (stripeError) {
        setError(stripeError.message || "An error occurred during payment.");
      } else if (paymentIntent) {
        setSuccess(`${paymentIntent.id}`);
        toast.success(
          `Your Payment Successfull your Order id ${paymentIntent.id}`
        );
        sendOrder(paymentIntent.id);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#5f63f2] text-white py-3 rounded-lg hover:bg-[#5f63f2] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : `Pay BDT ${count}`}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">
            Payment Successfull Your Order Id{success}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
