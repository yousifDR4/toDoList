import Router from "./Router";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
        <Provider store={store}>
          <Router ></Router>
        </Provider>
    </>
  );
}

export default App;
