import React from 'react';
import { useState } from 'react';
import type { Fase, NumeroIngresado, ResultadoOperacion } from '../types';
import { operar } from '../api/calculadora';
import { GameContext } from './GameContext';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [fase, setFase] = useState<Fase>('ingresando');
    const [numerosIngresados, setNumerosIngresados] = useState<NumeroIngresado[]>([]);
    const [resultadosConversion, setResultadosConversion] = useState<ResultadoOperacion[]>([]);
    const [indiceNumeroActual, setIndiceNumeroActual] = useState<number>(0);
    const [indicePasoActual, setIndicePasoActual] = useState<number>(0);
    const [resultadoFinal, setResultadoFinal] = useState<ResultadoOperacion | null>(null);

    const avanzarPaso = () => {
        setIndicePasoActual((prev) => prev + 1);
    };

    const retrocederPaso = () => {
        setIndicePasoActual((prev) => prev - 1);
    };

    const avanzarNumero = () => {
        setIndiceNumeroActual((prev) => prev + 1);
        setIndicePasoActual(0);
    };

    const agregarNumero = (numeroIngresado: NumeroIngresado) => {
        setNumerosIngresados((prev) => {
            const nuevoArray = [...prev, numeroIngresado];
            if (nuevoArray.length === 5) {
                setFase('convirtiendo');
                setIndiceNumeroActual(0);
                setIndicePasoActual(0);
            }
            return nuevoArray;
        });

        if (numerosIngresados.length < 4) {
            avanzarNumero();
        }
    };

    const guardarConversion = (pasosConversion: ResultadoOperacion) => {
        setResultadosConversion((prev) => {
            if (prev.length > indiceNumeroActual) return prev;
            return [...prev, pasosConversion];
        });
    };

    const operarFracciones = async () => {
        const fracciones = resultadosConversion.map((r) => r.fraccion);
        try {
            const response = await operar(fracciones);
            if (!response) throw new Error('Error al operar fracciones');
            setResultadoFinal(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const irAResultado = () => {
        setFase('resultado');
    };

    const irAOperando = () => setFase('operando');

    return (
        <GameContext.Provider
            value={{
                fase,
                numerosIngresados,
                resultadosConversion,
                indiceNumeroActual,
                indicePasoActual,
                resultadoFinal,

                agregarNumero,
                guardarConversion,
                avanzarPaso,
                retrocederPaso,
                avanzarNumero,
                operarFracciones,
                irAResultado,
                irAOperando,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
