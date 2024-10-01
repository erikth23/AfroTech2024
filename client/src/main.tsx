import "regenerator-runtime/runtime"
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import Submit from "./components/candidateView/Submit/index.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"
import InstructionsPage from "./pages/InstructionsPage/index.tsx"
import LeaderboardPage from "./pages/LeaderboardPage/index.tsx"
import AboutYouPage from "./pages/AboutYouPage/index.tsx"
import RouteGuard from "./util/routeGuard.tsx"
import WelcomePage from "./pages/WelcomePage/index.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/aboutYou" element={<AboutYouPage />} />
          <Route
            path="/instructions"
            element={
              <RouteGuard nextPath="/aboutYou">
                <InstructionsPage />
              </RouteGuard>
            }
          />
          <Route
            path="/assessment"
            element={
              <RouteGuard nextPath="/instructions">
                <App />
              </RouteGuard>
            }
          />
          <Route
            path="/submit"
            element={
              <RouteGuard nextPath="/assessment">
                <Submit />
              </RouteGuard>
            }
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
