import axios from "axios";
import { useEffect, useState } from "react";

const List = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/post").then((res) => {
      setPosts(res.data);
    });
  }, []);

  posts.map((post, idx) => {
    return <div key={idx}>post.name post.image post.body post.enjoyType</div>;
  });
};

export default List;
