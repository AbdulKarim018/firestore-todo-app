import { Button } from '@nextui-org/react'
import { deleteDoc, doc } from 'firebase/firestore'
import { useFirebase } from '../contexts/firebase';


const Todo = ({ todo }: { todo: { todo: string, isCompleted: Boolean, createdAt: Date, id: string } }) => {

  const { db } = useFirebase();


  const deleteTodo = (id: string) => {
    deleteDoc(doc(db, "todos", id))
  }

  return (
    <li className="flex items-center justify-between">
      <span className="text-xl">{todo.todo}</span>
      <Button variant="shadow" color="danger" size="sm" className="m-2" onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </Button>
    </li>
  )
}

export default Todo