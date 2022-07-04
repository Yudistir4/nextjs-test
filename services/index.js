// import { post, posts } from "../constants/dummy";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";

const convertToQueryStr = (query) => {
  let result = "";
  for (const key in query) {
    result += `&${key}=${query[key]}`;
  }
  return result.replace("&", "?");
};
// GET

const getTodos = (query) => Get(`api/todos${convertToQueryStr(query)}`);
// const getTodos = () => Get(`api/todos`);
const getTodo = (id) => Get(`api/todos/${id}`);

// POST
const signin = (data) => Post("users/signin", data);
const signup = (data) => Post("users/signup", data);
const createTodo = (data) => Post("api/todos", data);

// PUT
const updateTodo = (data) => Put(`api/todos/${data.id}`, data);

// DELETE
const deleteTodo = (id) => Delete(`api/todos/${id}`);

const API = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default API;
