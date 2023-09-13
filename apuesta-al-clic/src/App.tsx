import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate, useLocation} from 'react-router-dom';

import './App.css';

function App() {
    const [ganador, setGanador] = useState(false);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Home setGanador={setGanador}/>}/>
                    <Route path="/ganador"
                           element={
                               ganador ? <Ganador/> : <Home setGanador={setGanador}/>
                           }
                    />
                </Routes>
            </Router>
        </div>
    );
}

function Home({setGanador}: { setGanador: (value: boolean) => void }) {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    let predict = () => {
        fetch('http://localhost:3000/ganador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({number: count}),
        }).then(async (response) => {
            if (response.ok) {
                const responseData = await response.json();
                const quote = responseData.quote;
                setGanador(true);
                navigate('/Ganador', {state: {quote: quote}});
            } else {
                alert('No resultaste ganador. Suerte en la próxima.')
            }
        }).catch((error) => {
            console.error('Error al comprobar si resultaste ganador: ', error);
        });
    }
    return (
        <>
            <h1>Apuesta al Clic</h1>
            <div className="counter">
                Clics: {count}
            </div>
            <button className="red-button" onClick={() => setCount((count: number) => count < 10 ? count + 1 : count)}>
                Clic
            </button>
            <hr/>
            <div className="button-container">
                <button className="bet-button" onClick={() => predict()}>🎲 Apuesta 🎲</button>
                <button className="reset-button" onClick={() => setCount(0)}>🔄</button>
            </div>
        </>
    );
}

function Ganador() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {quote} = state;
    let atras = () => {
        fetch('http://localhost:3000/ganador/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                navigate('/');
            }
        }).catch((error) => {
            console.error('Error al comprobar si resultaste ganador: ', error);
        });
    }
    return (
        <>
            <h2>La suerte existe, tuviste suerte en encontrarla.</h2>
            <p>{quote}</p>
            <button className="back-button" onClick={() => atras()}> 🔙</button>
        </>
    );
}

export default App;
