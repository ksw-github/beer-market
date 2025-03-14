import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
  image: string;
}

// 장바구니 초기값
interface CartContextType {
  cart: CartItem[];
  addToCart: (beer: CartItem) => void;
  getCartItemCount: (beerId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//앱 전체에서 장바구니 상태 제공
export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  //장바구니에 맥주 추가
  const addToCart = (beer: CartItem) => {
    setCart((prevCart) => {
      const existItem = prevCart.find((item) => item.id === beer.id);
      if (existItem) {
        return prevCart.map((item) =>
          item.id === beer.id
            ? {
                ...item,
                count: item.count + 1,
              }
            : item
        );
      } else {
        return [...prevCart, { ...beer, count: 1 }];
      }
    });
  };

  //장바구니 수량 반환 함수
  const getCartItemCount = (beerId: number) => {
    const item = cart.find((beer) => beer.id === beerId);
    return item ? item.count : 0;
  };
};
