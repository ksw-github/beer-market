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
        <Link to="/">
          <img src={location.pathname === "/" ? "/list02.png" : "/list.png"} />
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/cart">
          {totalCount > 0 && <div className="total-icon">{totalCount}</div>}
          <img
            src={location.pathname === "/cart" ? "/cart02.png" : "/cart.png"}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
