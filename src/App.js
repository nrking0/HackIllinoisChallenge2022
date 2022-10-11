import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className="App">
            <div className="nav">
                <Navbar />
            </div>
            <div className="main">
                <Calendar />
            </div>
        </div>
    );
}

export default App;
