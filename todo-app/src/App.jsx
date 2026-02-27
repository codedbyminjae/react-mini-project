import "./App.css";
import { useRef, useReducer } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Editor from "./components/Editor";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "지원이 만나기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "샤브올데이 가기",
    date: new Date().getTime(),
  },
];

// reducer : todos 상태를 실제로 바꾸는 함수
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }

    case "UPDATE": {
      return state.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
    }

    case "DELETE": {
      return state.filter((todo) => todo.id !== action.targetId);
    }

    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    dispatch({
      type: "CREATE",
      data: newTodo,
    });
  };

  // todos State의 값들 중에서
  // targetId와 일치하는 id를 갖는 투두 아티엠의 isDone 변경

  // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
