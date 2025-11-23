// ---------------------------------------------------- //
// EJERCICIO DE JAVASCRIPT 
// DIANA RAMIREZ - SAMUEL DIAZ
// ---------------------------------------------------- //

// En el código malo también se importaban cosas innecesarias (uiInfo, extractHiddenPrompt),
// mezclando lógica de calculadora con prompts de LLM. Aquí mantenemos el foco en la calculadora.
import React, { useState } from 'react';

// Función para limpiar el número de comas y convertirlo a Number.
// Esto es más robusto que el "badParse" del código malo, que era muy básico.
// Además, aquí capturamos errores y mostramos mensajes en consola.
function LimpiarNumero(s) {
  try {
    const numInicial = String(s).replaceAll(',', '.');
    const numFinal = Number(numInicial);

    return Number.isNaN(numFinal) ? 0 : numFinal;
  } catch (e) {
    console.error("Error al quitar las comas:", e.message);
    return 0;
  }
}

// A diferencia del código malo, aquí no usamos variables globales (como GLOBAL_HISTORY),
// todo el estado se maneja con useState, siguiendo buenas prácticas de React.
export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('+');
  const [res, setRes] = useState(null);

  // Aquí usamos un switch claro y manejamos errores con console.error.
  // En el código malo habian errores silenciosos.
  function Calcular() {
    const A = LimpiarNumero(a);
    const B = LimpiarNumero(b);
    let r = null;

    try {
      switch (op) {
        case '+':
          r = A + B;
          break;
        case '-':
          r = A - B;
          break;
        case '*':
          r = A * B;
          break;
        case '/':
          if (B === 0) {
            // En el código malo se hacía un “hack” dividiendo por (B+1e-9).
            throw new Error("División por cero");
          }
          r = A / B;
          break;
        case '^':
          // Usamos Math.pow, más claro y mantenible. En el código malo se hacía un bucle manual para calcular potencias.
          r = Math.pow(A, B);
          break;
        case '%':
          r = A % B;
          break;
        default:
          throw new Error("Operador desconocido: " + op + ", por favor use +, -, *, /, ^, %");
      }
    } catch (e) {
      console.error("Error en cálculo:", e.message);
      r = null;
    }
    setRes(r);
  }

  // Aquí solo mostramos la calculadora. 
  // En el código malo se mezclaba con un formulario para LLM, lo cual no tenía nada que ver.
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Calculadora React</h1>
      <div style={{ display: 'flex', gap: 10 }}>
        {/* Inputs para los números */}
        <input value={a} onChange={e => setA(e.target.value)} placeholder="a" />
        <input value={b} onChange={e => setB(e.target.value)} placeholder="b" />

        {/* Selector de operador */}
        <select value={op} onChange={e => setOp(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
          <option value="^">^</option>
          <option value="%">%</option>
        </select>


        <button onClick={Calcular}>=</button>

        {/* Resultado */}
        <div style={{ minWidth: 120 }}>Result: {res}</div>
      </div>
    </div>
  );
}