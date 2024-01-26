import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useFirebase } from "../contexts/firebase";
import Todo from "./Todo";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

type Props = {
  className?: string;
};

const TodoList = ({ className }: Props) => {
  const [todos, setTodos] = useState<DocumentData | []>([]);

  const [loading, setLoading] = useState(true);

  const { db } = useFirebase();

  const todosRef = collection(db, "todos");

  const q = query(todosRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snap) => {
    const todosData = snap.docs.map((doc) => doc.data());
    const todosId = snap.docs.map((doc) => doc.id);

    setTodos([
      ...todosData.map((todo, index) => {
        return {
          ...todo,
          id: todosId[index],
        };
      }),
    ]);
    setLoading(false);
  });

  // const getTodos = async () => {
  //   const q = query(todosRef, orderBy("createdAt", "desc"));
  //   setLoading(true);
  //   const snap = await getDocs(q);
  //   setLoading(false);
  //   const todosData = snap.docs.map(doc => doc.data());
  //   const todosId = snap.docs.map(doc => doc.id);

  //   setTodos([
  //     ...todosData.map((todo, index) => {
  //       return {
  //         ...todo,
  //         id: todosId[index]
  //       }
  //     })
  //   ])
  // }

  // useEffect(() => {
  //   getTodos();
  //   return () => {
  //     setTodos([])
  //   }
  // }, [])

  return (
    <>
      {todos.map(
        (todo: {
          todo: string;
          isCompleted: Boolean;
          createdAt: Date;
          id: string;
        }) => (
          <ul className={`${className}`} key={todo.id}>
            <Todo todo={todo} key={todo.id} />
          </ul>
        ),
      )}

      {loading && (
        <div className="flex justify-center mt-5 p-24">
          <Spinner color="default" />
        </div>
      )}

      {todos.length === 0 && !loading && (
        <div className="flex justify-center mt-5 p-10 mb-5">
          <h2 className="text-4xl text-center font-extrabold">No Todos Yet!</h2>
        </div>
      )}
    </>
  );
};

export default TodoList;
