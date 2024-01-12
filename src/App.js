import "./App.css";
import Chatarea from "./components/Chatarea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <Chatarea />
      </div>
    </div>
  );
}

export default App;
