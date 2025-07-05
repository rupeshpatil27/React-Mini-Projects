import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, removeTodo, reorderTodo } from "./features/Todo/todoSlice"

import { AiOutlineClose } from "react-icons/ai";

function App() {

  const [todo, setTodo] = useState("")

  const { todos } = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  const dragItem = useRef();
  const dragOverItem = useRef();

  const [draggingIndex, setDraggingIndex] = useState(null);

  const handdleTodo = () => {
    dispatch(addTodo(todo))
    setTodo("")
  }


  const handleDragStart = (index) => {
    dragItem.current = index;
    setDraggingIndex(index);
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const sourceIndex = dragItem.current;
    const destinationIndex = dragOverItem.current;

    if (sourceIndex !== destinationIndex) {
      dispatch(reorderTodo({ sourceIndex, destinationIndex }));
    }

    dragItem.current = null;
    dragOverItem.current = null;

    setDraggingIndex(null);
  };


  return (
    <div className='h-full w-full'>
      <h1 className='text-4xl font-extrabold text-center text-white'>Todo</h1>

      <div className="w-full h-full flex justify-center items-center gap-3 mt-15">
        <input type="text" value={todo}
          onChange={(e) => setTodo(e.target.value)} placeholder="Enter Todo" className="min-w-[25rem] bg-[#282732] h-10 px-2 py-2 outline-0 focus:border-[1px] focus:border-white rounded-md font-semibold text-white" />

        <button className="bg-[#282732] text-lg font-bold py-2 px-10 rounded-sm text-white cursor-pointer" onClick={handdleTodo}>
          Add
        </button>
      </div>

      <div className="w-full h-full flex justify-center items-center flex-col gap-3 mt-15">

        {todos && todos.map((todo, index) => (
          <div
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            key={todo.id} className={`py-4 relative px-3 text-[16px] font-semibold bg-gradient-to-b from-[#282b4b] to-[#1f1e39] 
              flex items-center justify-start w-1/2 rounded-lg transition-all duration-300 ease-in-out select-none ${draggingIndex === index ? "cursor-move" : "cursor-pointer"}`}>
            <p className="text-[#d9ecff] font-semibold text-lg mr-2.5">{index + 1}.</p>
            <p className="text-[#d9ecff] font-semibold text-lg overflow-hidden text-ellipsis break-words whitespace-normal pr-10">{todo.text} </p>

            <AiOutlineClose className="text-white size-7 absolute top-1/2 right-5 -translate-y-1/2 hover:rotate-90 duration-200" onClick={() => dispatch(removeTodo(todo.id))} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default App
