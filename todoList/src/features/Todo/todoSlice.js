import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: state.todos.length + 1, text: action.payload });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    reorderTodo: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const updatedTodos = [...state.todos];
      const [moved] = updatedTodos.splice(sourceIndex, 1);
      updatedTodos.splice(destinationIndex, 0, moved);
      state.todos = updatedTodos;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo,reorderTodo } = todoSlice.actions;

export default todoSlice.reducer;
