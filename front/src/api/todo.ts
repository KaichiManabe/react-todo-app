export async function showTodos() {
  const url = "http://localhost:3000/todos";
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`resonse status ${response.status}`);
    }
    console.log(response.json);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}
