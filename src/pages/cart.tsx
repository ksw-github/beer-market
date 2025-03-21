import { Link } from "react-router-dom";
import { useCart } from "../components/cartitem";
import { URL } from "../router/constants";

const Cart = () => {
  const { cart, setCart, getCartItemCount, removeCartItem } = useCart(); //장바구니 상태
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0); //총 구매수량
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  ); //총 결제금액

  //장바구니 초기화
  const handleBuy = () => {
    console.log("구매 내역:", cart);
    setCart([]);
  };

  return (
    <main>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="card">
                <div className="info">
                  <div>
                    <img src={`${URL}${item.image}`} alt={item.name} />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    {item.tags.map((tag) => (
                      <span key={tag.key}>#{tag.name}&nbsp;&nbsp;</span>
                    ))}
                    <p>
                      <b>{new Intl.NumberFormat().format(item.price)}</b>원
                    </p>
                    <p>
                      수량 : <b>{getCartItemCount(item.id)}</b>
                    </p>
                  </div>
                </div>
                <div className="btn">
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="close"
                  >
                    취소
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total">
            <p>
              총 구매수량 <b>{totalCount}</b> 개
            </p>
            <p>
              총 결제금액 <b>{new Intl.NumberFormat().format(totalPrice)}</b> 원
            </p>
          </div>
          <button onClick={handleBuy} className="buy">
            구매하기
          </button>
        </div>
      ) : (
        <div className="blank">
          <div>
            <img src={`${URL}bag.png`} alt="빈바구니" />
          </div>
          <h2>카트가 비었습니다</h2>
          <p>
            목록에서 원하는 맥주를
            <br />
            카트에 담아보세요
          </p>
          <Link to={URL}>
            <button>목록으로 가기</button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Cart;
