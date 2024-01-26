import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../contexts/firebase';
import Todo from './Todo'
import { useState } from 'react';

type Props = {
  className?: string
}

const TodoList = ({ className }: Props) => {

  const [todos, setTodos] = useState<DocumentData | []>([])

  const { db } = useFirebase();

  const todosRef = collection(db, "todos");

  const getTodos = async () => {
    const snap = await getDocs(todosRef);
    const todosData = snap.docs.map(doc => doc.data());
    const todosId = snap.docs.map(doc => doc.id);
    setTodos([
      ...todosData.map((todo, index) => {
        return {
          ...todo,
          id: todosId[index]
        }
      })
    ])
  }

  getTodos();

  return (
    todos.map((todo: { todo: string, isCompleted: Boolean, createdAt: Date, id: string }) => (
      <ul className={`${className}`} key={todo.id}>
        <Todo todo={todo} key={todo.id} />
      </ul>
    ))
  )
}

export default TodoList