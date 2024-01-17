import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import Chat from "./pages/Chat";
import { AuthProvider } from "./contexts/userAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path=":chatId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
