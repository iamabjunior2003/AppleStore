// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppleHomePage from "./Components/AppleHomePage";
import AppleLogin from "./Components/AppleLogin";
import Iphones from "./Components/Iphones";
import MacCatalog from "./Components/MacCatalog";
import WatchCatalog from "./Components/WatchCatalog";
import IPadCatalog from "./Components/iPadCatalog";
import StoreCatalog from "./Components/StoreCatalog";
import TvHomeCatalog from "./Components/TVHomeCatalog";
import AirPodsCatalog from "./Components/AirPodsCatalog";
import EntertainmentCatalog from "./Components/EntertainmentCatalog";
import Payment from "./Components/Payment";
import PrivateRoute from "./Components/PrivateRoute"; // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Route */}
        <Route path="/login" element={<AppleLogin />} />

        {/* ✅ Protected Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <AppleHomePage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <AppleHomePage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/store" 
          element={
            <PrivateRoute>
              <StoreCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/mac" 
          element={
            <PrivateRoute>
              <MacCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/ipad" 
          element={
            <PrivateRoute>
              <IPadCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/iphone" 
          element={
            <PrivateRoute>
              <Iphones />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/watch" 
          element={
            <PrivateRoute>
              <WatchCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/airpods" 
          element={
            <PrivateRoute>
              <AirPodsCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/tv-home" 
          element={
            <PrivateRoute>
              <TvHomeCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/entertainment" 
          element={
            <PrivateRoute>
              <EntertainmentCatalog />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/payment" 
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          } 
        />

        {/* 🚨 Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
