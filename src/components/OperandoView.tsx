import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';

export const OperandoView = () => {
    const { operarFracciones, resultadoFinal, indicePasoActual, avanzarPaso, retrocederPaso, irAResultado } = useGame();

    useEffect(() => {
        operarFracciones();
    }, []);

    if (!resultadoFinal) return <div>Calculando...</div>;

    const pasos = resultadoFinal.pasos;
    const esUltimoPaso = indicePasoActual === pasos.length - 1;

    return (
        <div>
            <h1>Operando las fracciones</h1>
            <p>{pasos[indicePasoActual]}</p>
            <button onClick={retrocederPaso} disabled={indicePasoActual === 0}>
                Atrás
            </button>
            {esUltimoPaso ? (
                <button onClick={irAResultado}>Ver resultado</button>
            ) : (
                <button onClick={avanzarPaso}>Siguiente</button>
            )}
        </div>
    );
};
