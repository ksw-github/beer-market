import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "./cartitem";

const Header = () => {
  const location = useLocation();
  const { cart } = useCart(); //장바구니 상태
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0); //총 구매수량
  return (
    <header>
      <div>
        <span>맥주 담기</span>
      </div>
      <div>
        <Link to="/beer-market">
          <img
            src={
              location.pathname === "/beer-market"
                ? "/beer-market/list02.png"
                : "/beer-market/list.png"
            }
          />
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/cart">
          {totalCount > 0 && <div className="total-icon">{totalCount}</div>}
          <img
            src={
              location.pathname === "/cart"
                ? "/beer-market/cart02.png"
                : "/beer-market/cart.png"
            }
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
