import { createContext } from 'react';
import type { Fase, NumeroIngresado, ResultadoOperacion } from '../types';

interface GameContextType {
    // Estado
    fase: Fase;
    numerosIngresados: NumeroIngresado[];
    resultadosConversion: ResultadoOperacion[];
    indiceNumeroActual: number;
    indicePasoActual: number;
    resultadoFinal: ResultadoOperacion | null;

    // Acciones
    agregarNumero: (numero: NumeroIngresado) => void;
    guardarConversion: (resultado: ResultadoOperacion) => void;
    avanzarPaso: () => void;
    retrocederPaso: () => void;
    avanzarNumero: () => void;
    operarFracciones: () => Promise<void>;
}

// Context
export const GameContext = createContext<GameContextType | null>(null);
