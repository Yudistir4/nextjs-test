import { useRouter } from "next/router";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}
const Post = ({ id, title, body }: Post) => {
  console.log(id, title);
  const router = useRouter();
  if (router.isFallback) {
    return <div className="text-3xl">Loading...</div>;
  }
  return (
    <div className="">
      Hai : {id} {title} {body}
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return {
    paths: data
      .slice(0, 3)
      .map((val: Post) => ({ params: { id: `${val.id}` } })),
    fallback: true,
  };
}
export async function getStaticProps(context: any) {
  const { id } = context.params;
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const data = await res.json();
  return {
    props: {
      ...data,
    },
  };
}
