import { Box, Button, List, ListItem, TextField } from "@mui/material";
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
      if (todo.length == 0){
        return;
      }
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
          <Box>
            {todos.map((todo) => {
              return (
                <ListItem key={todo.id}>
                  <Box
                    sx={{
                      border: "1px,black,solid",
                      width: "258px",
                      height: "54px",
                      padding: "4px",
                    }}
                  >
                    <p>{todo.name}</p>
                  </Box>
                  <Button variant="outlined">編集</Button>
                  <Button variant="outlined">削除</Button>
                </ListItem>
              );
            })}
          </Box>
        ) : (
          <p>Todoは何もありません</p>
        )}
      </List>
      <form>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TextField value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button type="submit" onClick={addTodo} variant="contained">
            追加
          </Button>
        </Box>
      </form>
    </>
  );
}
