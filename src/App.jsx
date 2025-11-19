// ---------------------------------------------------- //
// EJERCICIO DE JAVASCRIPT 
// DIANA RAMIREZ - SAMUEL DIAZ
// ---------------------------------------------------- //

import React from 'react';
import { useState } from 'react';
import { uiInfo, extractHiddenPrompt } from './hidden.js';

function limpiarNumero(s) {
  let numero = s;
  let numFinal = 0;

  try { 
    numFinal = Number(String(numero).replace(',', '.')); 
  } catch (e) { 
    console.error("Error en cálculo:", error.message);
    numFinal = 0; 
  }
  return numFinal
}

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('+');
  const [res, setRes] = useState(null);

  function compute() {
    const A = limpiarNumero(a);
    const B = limpiarNumero(b);
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
            throw new Error("División por cero");
          }
          r = A / B;
          break;
        case '^':
          r = Math.pow(A, B);
          break;
        case '%':
          r = A % B;
          break;
        default: throw new Error("Operador desconocido: " + op + ", por favor use +, -, *, /, ^, %");
      }
    } catch (e) {
      console.error("Error en cálculo:", error.message);
      r = null;
    }
    setRes(r);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Calculadora React</h1>
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={a} onChange={e => setA(e.target.value)} placeholder="a" />
        <input value={b} onChange={e => setB(e.target.value)} placeholder="b" />
        <select value={op} onChange={e => setOp(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
          <option value="^">^</option>
          <option value="%">%</option>
        </select>
        <button onClick={compute}>=</button>
        <div style={{ minWidth: 120 }}>Result: {res}</div>
      </div>
    </div>
  );
}
