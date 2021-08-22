import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";

import Store from "./context";
import reducer from "./reducer";

import { usePersistedContext, usePersistedReducer } from "./usePersist";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { createInstance, HackleProvider, useVariation } from "@hackler/react-sdk";

const hackleClient = createInstance("j7izdsBGwRNEa053vqiRAqFtt16bNr48")

function App() {
  // create a global store to store the state
  const globalStore = usePersistedContext(useContext(Store), "state");

  // `todos` will be a state manager to manage state.
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    "state" // The localStorage key
  );

    // 실험 키가 5인 A/B 테스트에서 사용자에게 노출할 테스트 그룹을 결정합니다.
    // 결정하지 못하는 상황인 경우 테스트 그룹 A를 반환합니다.
  const variation = useVariation(5);
  // console.log("variation", variation);

    // 할당받은 그룹에 대한 로직
    // if (variation === "A") return <AwesomeFeature />
    // if (variation === "B") return <SuperAwesomeFeature />
    // return <AwesomeFeature />

  return (
      // State.Provider passes the state and dispatcher to the down
    <Store.Provider value={{ state, dispatch }}>
      {/* 할당받은 그룹에 대한 로직 */}
      <div>Varients: {variation}</div>
        <TodoForm />
        <TodoList />
        </Store.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<HackleProvider hackleClient={hackleClient}><App /></HackleProvider>, rootElement);
