import React from "react";
import firebase from "../Firebase/firebase";
import "../App.css";

export default function Todo({ todo }) {
  const deleteTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };
  const completeTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };
  return (
    <div>
            <tr>
              <td><h1 className={todo.complete ? "complete" : ""}>{todo.title}</h1></td>
              <td><button style={{ width: "200px" }} onClick={deleteTodo}>Delete</button></td>
              <td><button style={{ width: "200px" }} onClick={completeTodo}>Complete</button></td>
            </tr>
    </div>
  );
}
