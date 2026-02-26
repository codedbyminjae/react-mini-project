import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Editor from "./components/Editor";

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <Header />
      <Editor />
      <List />
    </div>
  );
}

export default App;
