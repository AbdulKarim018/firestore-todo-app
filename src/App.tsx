import { Button, Input } from "@nextui-org/react";
import TodoList from "./components/TodoList";
import { useFirebase } from "./contexts/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const { db } = useFirebase();
  const todosRef = collection(db, "todos");
  const addTodo = async (todo: string) => {
    setLoading(true);
    await addDoc(todosRef, {
      todo,
      completed: false,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = e.currentTarget.todo.value;
    if (!todo) return;
    e.currentTarget.reset();
    await addTodo(todo);
  };

  return (
    <>
      <h2 className="md:text-4xl text-3xl text-center font-extrabold pt-6">
        FireStore Todo App{" "}
        <span className="md:text-xl text-medium">by Abdul Karim</span>
      </h2>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-transparent border border-black shadow-xl rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <Input
                id="todo"
                type="text"
                label="New Todo"
                variant="underlined"
                color="primary"
                required
                isRequired
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="shadow"
                color="primary"
                type="submit"
                isLoading={loading}
              >
                Add Todo
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md bg-transparent border border-black shadow-xl rounded px-8 pb-8 mb-4">
          <h2 className="text-3xl underline font-bold text-center mt-6">
            Todos
          </h2>
          <TodoList className="mt-4" />
        </div>
      </div>
    </>
  );
}

export default App;
