import { useEffect, useState } from "react";

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

        setBeers(beersData);
        setTags(tagsData);
      } catch (error) {
        console.error(error);
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
                  재고 <b>{beer.stock}</b>
                </p>
              </div>
            </div>
            <div className="btn">
              <button>담기</button>
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
