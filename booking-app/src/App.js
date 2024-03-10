import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import "./App.css";
import SignUp from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        {/* <Route path="/" exact component={Home} />
        <Route path="/oferta" component={Offer} />
        <Route path="/galeria" component={Gallery} />
        <Route path="/cennik" component={PriceList} />
        <Route path="/onas" component={AboutUs} />
        <Route path="/zarezerwuj" component={Reservation} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
