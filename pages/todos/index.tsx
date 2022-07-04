import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import API from "../../services";

interface Task {
  id: string;
  task: string;
}

interface Tasks {
  page: number;
  limit: number;
  totalPages: number;
  docs: Task[];
}

const convertToQueryStr = (query: any) => {
  let result = "";
  for (const key in query) {
    result += `&${key}=${query[key]}`;
  }
  return result.replace("&", "?");
};
const Todos = ({ docs, totalPages }: Tasks) => {
  const [data, setData] = useState(docs);
  const [input, setInput] = useState("");
  //   const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  const getData = async (query: any) => {
    setIsFetching(true);
    const res = await API.getTodos(query);
    setData(res.data.docs);
    setIsFetching(false);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    const res = await API.createTodo({ task: input });
    console.log(res.data);

    // console.log(input);
    setData((prev) => [res.data, ...prev]);
    setInput("");
    setIsSubmit(false);
  };

  const pagination = (page: string) => {
    let { query } = router;
    query.page = page;

    getData(query);
    router.push(`/todos${convertToQueryStr(query)}`);
  };

  const handleDelete = async (id: string) => {
    setIsFetching(true);
    try {
      await API.deleteTodo(id);
      getData(router.query);
    } catch (error) {
      console.log("Failed delete");
    }
    setIsFetching(false);
  };
  return (
    <div className="m-auto w-[300px] flex gap-3 flex-col">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none bg-gray-100 rounded-full p-1 pl-2"
        />
        <Button
          type="submit"
          isLoading={isSubmit}
          //   disabled={isFetching}
          className="px-3 py-1 bg-blue-500 rounded-xl"
        >
          Submit
        </Button>
      </form>
      {isFetching && <div>Loading...</div>}
      {!isFetching &&
        data &&
        data.map((val) => (
          <div
            key={val.id}
            className="flex items-center justify-center bg-gray-100 rounded-xl p-3"
          >
            <div className="">{val.task}</div>
            <div className="flex-1"></div>
            <button
              onClick={() => handleDelete(val.id)}
              className="bg-red-500 px-3 py-1 rounded-lg"
            >
              delete
            </button>
            <button className="bg-blue-500 px-3 py-1 rounded-lg">edit</button>
          </div>
        ))}
      <div className="flex items-center justify-center gap-3">
        {[...Array(totalPages)].map((val, i) => (
          <button
            key={i}
            onClick={() => pagination(i + 1 + "")}
            className="rounded-full bg-gray-100 h-10 w-10 flex items-center justify-center"
          >
            {val} {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Todos;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);

  const res = await API.getTodos(context.query);

  return {
    props: {
      ...res.data,
      // docs: [{ id: "1", task: "asik" }],
      // totalPages: 2,
    },
  };
};
