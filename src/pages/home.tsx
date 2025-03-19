import { useEffect, useState } from "react";
import { useCart } from "../components/cartitem";

interface Tag {
  key: string;
  name: string;
}

interface Beer {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  tags: Tag[];
}

const Home = () => {
  const [beers, setBeers] = useState<Beer[]>([]); //맥주 목록
  const [tags, setTags] = useState<Tag[]>([]); //태그 목록
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set()); //태그 선택
  const [visibleBeers, setVisibleBeers] = useState(3); //보일 맥주 수
  const {
    cart,
    addToCart,
    getCartItemCount,
    getCartItemStock,
    removeCartItem,
  } = useCart(); //장바구니 상태

  // 맥주, 태그 목록 가져오기
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const beersResponse = await fetch("/api/beer.json");
        const tagResponse = await fetch("/api/tag.json");

        if (!beersResponse.ok || !tagResponse.ok) {
          throw new Error("API 오류");
        }

        const beersData: Beer[] = await beersResponse.json();
        const tagsData: Tag[] = await tagResponse.json();

        console.log(beersData);

        setBeers(beersData);
        setTags(tagsData);
      } catch (error) {
        console.error("목록/태그 로딩 오류", error);
      }
    };
    fetchBeers();
  }, []);

  //태그 선택
  const toggleTag = (tagKey: string) => {
    setSelectedTags((prevTags) => {
      {
        const newTags = new Set(prevTags);
        if (newTags.has(tagKey)) {
          newTags.delete(tagKey);
        } else {
          newTags.add(tagKey);
        }
        return newTags;
      }
    });

    //목록이 업데이트마다 3개씩 초기화
    setVisibleBeers(3);
  };

  //태그된 맥주 불러오기
  const filterBeers =
    selectedTags.size === 0
      ? beers
      : beers.filter((beer) => {
          return beer.tags.some((tag) => selectedTags.has(tag.key));
        });

  //더보기 3개씩 보이게
  const loadMore = () => {
    setVisibleBeers((prevCount) => prevCount + 3);
  };

  //장바구니에 추가
  const handleAddToCart = (beer: Beer) => {
    if (beer.stock > 0) {
      //장바구니에서 해당 맥주를 찾음
      const cartItem = cart.find((item) => item.id === beer.id);
      if (cartItem) {
        if (cartItem.count < beer.stock) {
          //해당 맥주 수량이 재고량을 초과하지 않도록 제한
          addToCart({ ...beer, count: cartItem.count + 1 });
        }
      } else {
        //장바구니에 없으면 처음으로 추가
        addToCart({ ...beer, count: 1 });
      }
    }
  };

  //장바구니에서 삭제
  const handleRemoveFromCart = (beer: Beer) => {
    removeCartItem(beer.id);
  };

  return (
    <main>
      {tags.map((tag) => (
        <span key={tag.key}>
          <button
            onClick={() => toggleTag(tag.key)}
            className={selectedTags.has(tag.key) ? "active" : ""}
          >
            {tag.name}
          </button>
          &nbsp;
        </span>
      ))}
      <ul>
        {filterBeers.slice(0, visibleBeers).map((beer) => (
          <li key={beer.id} className="card">
            <div className="info">
              <div>
                <img src={beer.image} alt={beer.name} width={100} />
              </div>
              <div>
                <h3>{beer.name}</h3>
                {beer.tags.map((tag) => (
                  <span key={tag.key}>#{tag.name}&nbsp;&nbsp;</span>
                ))}
                <p>
                  <b>{new Intl.NumberFormat().format(beer.price)}</b>원
                  <br />
                  재고
                  <b>{getCartItemStock(beer.id)}</b>
                  수량 <b>{getCartItemCount(beer.id)}</b>
                </p>
              </div>
            </div>
            <div className="btn">
              {getCartItemCount(beer.id) > 0 && (
                <button
                  className="close"
                  onClick={() => handleRemoveFromCart(beer)}
                >
                  빼기
                </button>
              )}
              &nbsp;&nbsp;
              <button
                onClick={() => handleAddToCart(beer)}
                disabled={getCartItemStock(beer.id) === 0}
              >
                담기
              </button>
            </div>
          </li>
        ))}
      </ul>
      {filterBeers.length > visibleBeers && (
        <button className="more" onClick={loadMore}>
          더보기 +
        </button>
      )}
    </main>
  );
};

export default Home;
