import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  const todos = useContext(TodoStateContext); // ✅ 상태만 가져옴
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => setSearch(e.target.value);

  const filteredTodos =
    search === ""
      ? todos
      : todos.filter((todo) =>
          todo.content.toLowerCase().includes(search.toLowerCase()),
        );

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    return { totalCount, doneCount, notDoneCount: totalCount - doneCount };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>

      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />

      <div className="todos_wrapper">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default List;
