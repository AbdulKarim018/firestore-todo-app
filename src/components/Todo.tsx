import { Button } from "@nextui-org/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirebase } from "../contexts/firebase";
import { useState } from "react";

const Todo = ({
  todo,
}: {
  todo: { todo: string; isCompleted: Boolean; createdAt: Date; id: string };
}) => {
  const [loading, setLoading] = useState(false);

  const { db } = useFirebase();

  const deleteTodo = async (id: string) => {
    setLoading(true);
    await deleteDoc(doc(db, "todos", id));
    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between">
      <span className="text-xl">{todo.todo}</span>
      <Button
        variant="shadow"
        color="danger"
        size="sm"
        className="m-2"
        onClick={() => deleteTodo(todo.id)}
        isLoading={loading}
      >
        Delete
      </Button>
    </li>
  );
};

export default Todo;
