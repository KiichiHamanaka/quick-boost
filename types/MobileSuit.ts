import Series from "./Series";

type MobileSuit = {
  id: number;
  name: string;
  series: Series;
  image: string; // S3的なサービスのURLに変更
};

export default MobileSuit;
