import { Box, Button, List, ListItem, TextField } from "@mui/material";
import "./App.css";
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
  const getTodos = async () => {
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
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    const url = "http://localhost:3000/todo";
    try {
      if (todo.length == 0) {
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
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodo = async (id: number) => {
    const url = `http://localhost:3000/todo/${id}`;
    try {
      if (todo.length == 0) {
        return;
      }
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ name: todo }),
        headers: myHeaders,
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`resonse status ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id: number) => {
    const url = `http://localhost:3000/todo/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: myHeaders,
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`resonse status ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <List>
        <h4>Todo一覧</h4>
        {todos && todos.length > 0 ? (
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
                  <Button
                    variant="outlined"
                    onClick={() => updateTodo(todo.id)}
                  >
                    編集
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    削除
                  </Button>
                </ListItem>
              );
            })}
          </Box>
        ) : (
          <p>Todoは何もありません</p>
        )}
      </List>
      <form>
        <Box display="flex" alignItems="center" justifyContent="center">
          <TextField
            value={todo}
            onChange={(e) => {
              e.preventDefault();
              setTodo(e.target.value);
            }}
          />
          <Button type="submit" onClick={addTodo} variant="contained">
            追加
          </Button>
        </Box>
      </form>
    </>
  );
}
