import { Button, List, ListItem, TextField } from "@mui/material";
import "./App.css";
// import { showTodos } from "./api/todo";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  name: string;
};
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const showTodos = async () => {
      const url = "http://localhost:3000/todos";
      try {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`resonse status ${response.status}`);
        }
        const todos: Todo[] = await response.json();
        console.log(todos);
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    showTodos();
  }, [todo]);

  const addTodo = async () => {
    const url = "http://localhost:3000/todo";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name: todo }),
        headers: myHeaders,
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`resonse status ${response.status}`);
      }
      const todos: Todo[] = await response.json();
      console.log(todos);
      setTodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <List>
        <h4>Todo一覧</h4>
        {todos ? (
          <p>
            {todos.map((todo) => {
              return <ListItem key={todo.id}>{todo.name}</ListItem>;
            })}
          </p>
        ) : (
          <p>Todoは何もありません</p>
        )}
      </List>
      <form>
        <TextField value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Button type="submit" onClick={addTodo}>
          追加
        </Button>
      </form>
    </>
  );
}
