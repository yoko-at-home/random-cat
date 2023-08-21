import { NextPage } from "next";
import { useEffect, useState } from "react";
const IndexPage: NextPage = () => {
  // ❶ useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // ❷ マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像URLの状態を更新する
      setLoading(false); // ローディング状態を更新する
    });
  }, []);
  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };
  return (
    <div>
      <button onClick={handleClick}>他のにゃんも見る</button>
      {/* // ❸ ローディング中でなければ、画像を表示する*/}
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};
export default IndexPage;
type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
