import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import Order from "./pages/OrderPage";
import VerifyPayment from "./pages/verifyPayment";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/dashboard/Layout";
import MainContent from "./pages/MainContent";
import LoginPage from "./pages/Login";
import TrackOrders from "./pages/TrackOrders";

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-wheat-50">
      {!isDashboardRoute && <Header />}
      <main className="flex-grow">
        <AppProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/verify" element={<VerifyPayment />} />
            <Route path="/track-order" element={<TrackOrders />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard/*"
              element={
                <Layout>
                  <MainContent />
                </Layout>
              }
            />
          </Routes>
        </AppProvider>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
