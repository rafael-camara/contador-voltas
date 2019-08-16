import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import MostraVoltas from "./MostraVoltas";
import MostraTempo from "./MostraTempo";
import Button from "./Button";

import "./styles.css";

function App() {
  const [numVoltas, setNumVoltas] = useState(0);
  const [running, setRunning] = useState(false);
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    let timer = null;
    if (running) {
      timer = setInterval(() => {
        setTempo(old => old + 1);
      }, 1000);
    }
    return () => {
      // truthy valor que é convertido para verdadeiro
      if (timer) clearInterval(timer);
    };
  }, [running]);

  const toggleRunning = () => setRunning(!running);

  const increment = () => setNumVoltas(numVoltas + 1);
  const decrement = () => {
    if (numVoltas > 0) setNumVoltas(numVoltas - 1);
  };

  const reset = () => {
    setNumVoltas(0);
    setTempo(0);
  };

  return (
    <div className="App">
      <MostraVoltas voltas={numVoltas} />
      <Button text="+" className="bigger" onClick={increment} />
      <Button
        disabled={numVoltas <= 1}
        text="-"
        className="bigger"
        onClick={decrement}
      />
      <MostraTempo
        tempo={numVoltas === 0 ? 0 : Math.round(tempo / numVoltas)}
      />
      <Button
        disabled={numVoltas === 0 && !tempo}
        onClick={toggleRunning}
        text={running ? "Pausar" : "Iniciar"}
      />
      <Button onClick={reset} text="Reiniciar" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
