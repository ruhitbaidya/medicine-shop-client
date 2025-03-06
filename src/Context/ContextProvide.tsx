"use client";

import {
  TCardFor,
  TOrder,
  TshippingInfo,
  Tuser,
} from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import { getUser } from "@/components/getUser/userFound";
import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface ContextType {
  count: number | undefined;
  setCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  card: TCardFor[];
  user: Tuser | null;
  setUser: Dispatch<SetStateAction<Tuser | null>>;
  shippingInfo: TshippingInfo | null;
  setShippingInfo: Dispatch<SetStateAction<TshippingInfo | null>>;
  setCard: React.Dispatch<React.SetStateAction<TCardFor[]>>;
  setTempOrder: Dispatch<SetStateAction<TOrder | null>>;
  tempOrder: TOrder | null;
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}

const defaultContextValue: ContextType = {
  count: 0,
  setCount: () => {},
  card: [],
  setCard: () => {},
  shippingInfo: null,
  setShippingInfo: () => {},
  setUser: () => {},
  setTempOrder: () => {},
  user: null,
  imageUrl: null,
  setImageUrl: () => {},
  tempOrder: null,
};

const ContextCreate = createContext<ContextType>(defaultContextValue);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tempOrder, setTempOrder] = useState<TOrder | null>(null);
  const [user, setUser] = useState<Tuser | null>(null);
  const [shippingInfo, setShippingInfo] = useState<TshippingInfo | null>(null);
  const [count, setCount] = useState<number | undefined>(0);
  const [card, setCard] = useState<TCardFor[]>([]);
  const findUser = async () => {
    const res = await getUser();
    if (res) {
      const result = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/getUser/${res.email}`
      );
      console.log(result.data);
      if (result) {
        setUser({
          name: result?.data?.email,
          email: result?.data?.email,
          role: result?.data?.role,
          _id: result?.data?._id,
        });
      }
    }
  };
  useEffect(() => {
    findUser();
  }, []);
  return (
    <ContextCreate.Provider
      value={{
        count,
        setCount,
        card,
        setCard,
        shippingInfo,
        setShippingInfo,
        user,
        setUser,
        tempOrder,
        setTempOrder,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </ContextCreate.Provider>
  );
};

export { ContextCreate, ContextProvider };
