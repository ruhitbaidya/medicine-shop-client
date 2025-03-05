"use client";

import { TCardFor, TshippingInfo } from "@/app/types/medicinestype";
import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface ContextType {
  count: number | undefined;
  setCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  card: TCardFor[];
  shippingInfo: TshippingInfo | null;
  setShippingInfo: Dispatch<SetStateAction<TshippingInfo | null>>;
  setCard: React.Dispatch<React.SetStateAction<TCardFor[]>>;
}

const defaultContextValue: ContextType = {
  count: 0,
  setCount: () => {},
  card: [],
  setCard: () => {},
  shippingInfo: null,
  setShippingInfo: () => {},
};

const ContextCreate = createContext<ContextType>(defaultContextValue);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [shippingInfo, setShippingInfo] = useState<TshippingInfo | null>(null);
  const [count, setCount] = useState<number | undefined>(0);
  const [card, setCard] = useState<TCardFor[]>([]);

  return (
    <ContextCreate.Provider
      value={{ count, setCount, card, setCard, shippingInfo, setShippingInfo }}
    >
      {children}
    </ContextCreate.Provider>
  );
};

export { ContextCreate, ContextProvider };
