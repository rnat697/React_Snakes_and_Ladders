import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import NumPlayersPage from "./pages/NumPlayersPage";
import AvatarPage from "./pages/AvatarPage";
import AvatarLayout from "./components/AvatarLayout";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import "./App.css";



function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        {/* <HeaderBar /> s*/}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/players" element={<NumPlayersPage />} />

          <Route path="/avatar" element={<AvatarLayout />}>
            <Route path=":currentID/:maxPlayers" element={<AvatarPage />} />
          </Route>

          <Route path="/game" element={<GamePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
