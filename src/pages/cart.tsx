import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <main>
      <ul className="list">
        <li>
          <div className="info">
            <div>
              <img src="/beer01.jpg" alt="맥주" />
            </div>
            <div>
              <h3>맥주</h3>
              <p>가격 : 1000원</p>
              <p>수량 : </p>
            </div>
          </div>
          <div className="btn">
            <button className="close">취소</button>
          </div>
        </li>
      </ul>
      <div className="total">
        <p>총 구매수량 개</p>
        <p>총 결제금액 원</p>
      </div>
      <button className="buy">구매하기</button>
      <div>
        <div>
          <img src="/bag.png" alt="빈바구니" className="bag" />
        </div>
        <h2>카트가 비었습니다</h2>
        <p>
          목록에서 원하는 맥주를
          <br />
          카트에 담아보세요
        </p>
      </div>
      <Link to="/">
        <button>목록으로 가기</button>
      </Link>
    </main>
  );
};

export default Cart;
