import React, { createContext, useContext, useEffect, useState } from "react";

interface Tag {
  key: string;
  name: string;
}
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  tags: Tag[];
  count: number;
}

// 장바구니 초기값
interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (beer: CartItem) => void;
  getCartItemCount: (beerId: number) => number;
  getCartItemStock: (beerId: number) => number;
  removeCartItem: (beerId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//앱 전체에 장바구니 상태 제공
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]); //장바구니 상태
  const [beers, setBeers] = useState<CartItem[]>([]); //맥주 목록 상태

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch("/beer-market/api/beer.json");
        const data: CartItem[] = await response.json();
        setBeers(data);
      } catch (error) {
        console.error("목록 로딩 오류", error);
      }
    };
    fetchBeers();
  }, []);

  //해당 아이템 추가
  const addToCart = (beer: CartItem) => {
    setCart((prevCart) => {
      //이미 있는 아이템인지 확인
      const existItem = prevCart.find((item) => item.id === beer.id);
      //이미 있는 아이템이고 재고가 있으면 수량 증가
      if (existItem && existItem.count && beer.stock) {
        return prevCart.map((item) =>
          item.id === beer.id
            ? {
                ...item,
                count: item.count + 1,
              }
            : item
        );
        //없는 아이템이고 재고가 있으면 추가
      } else if (!existItem && beer.stock > 0) {
        return [...prevCart, { ...beer, count: 1 }];
      }
      //재고가 없으면 그대로 반환
      return prevCart;
    });
  };

  //해당 아이템 수량
  const getCartItemCount = (beerId: number) => {
    const item = cart.find((beer) => beer.id === beerId);
    return item ? item.count : 0;
  };

  //해당 아이템 재고량
  const getCartItemStock = (beerId: number) => {
    const item = cart.find((beer) => beer.id === beerId);
    const cartItemCount = getCartItemCount(beerId);
    if (!item) {
      return beerId ? beers.find((beer) => beer.id === beerId)?.stock ?? 0 : 0;
    }
    // return item ? item.stock - cartItemCount : 0;
    return item.stock - cartItemCount;
  };

  //해당 아이템 삭제
  const removeCartItem = (beerId: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === beerId) {
            //수량이 1보다 크면 수량 감소
            if (item.count > 1) {
              return { ...item, count: item.count - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null); // null값을 필터링하여 제거된 아이템 삭제
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getCartItemCount,
        getCartItemStock,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//장바구니 상태 커스텀훅
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("장바구니값 에러");
  }
  return context;
};
