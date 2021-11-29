import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      サイトの説明的なやつ
      <Link href={"/list"}>
        <a>List</a>
      </Link>
    </div>
  );
};

export default IndexPage;
