import Link from "next/link";
import { resolve } from "path";
import React from "react";

interface Post {
  id: number;
  title: string;
}
interface Posts {
  posts: Post[];
}

const Posts = ({ posts }: Posts) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Posts</h1>

      {posts.map((val) => (
        <Link key={val.id} href={`/posts/${val.id}`} prefetch={false}>
          <a>
            {/* <div className="bg-gray-100 rounded-lg p-3"> */}
            {val.id} | {val.title}
            {/* </div> */}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}
