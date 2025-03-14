import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
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
          <img
            src={location.pathname === "/cart" ? "/cart02.png" : "/cart.png"}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
