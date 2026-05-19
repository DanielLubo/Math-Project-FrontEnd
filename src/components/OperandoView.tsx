import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';


export const OperandoView = () => {
    const { operarFracciones, resultadoFinal, indicePasoActual, avanzarPaso, retrocederPaso, irAResultado } = useGame();

    useEffect(() => {
        operarFracciones();
    }, []);

    if (!resultadoFinal)
        return (
            <div className="min-h-screen bg-bmo-dark flex items-center justify-center font-mono text-bmo-cyan">
                Calculando...
            </div>
        );

    const pasos = resultadoFinal.pasos;
    const esUltimoPaso = indicePasoActual === pasos.length - 1;

    return (
        <div className="min-h-screen bg-bmo-dark text-bmo-text flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md flex flex-col gap-6">

                <div>
                    <p className="text-xs tracking-widest text-bmo-green uppercase font-mono">
                        operando las fracciones
                    </p>
                    <h1 className="text-2xl font-light text-bmo-text mt-1">
                        Calculando el <span className="text-bmo-green font-medium">resultado</span>
                    </h1>
                </div>

                <div className="bg-bmo-surface border border-bmo-border rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono px-3 py-1 rounded-full bg-bmo-dark border border-bmo-cyan text-bmo-cyan">
                                paso {indicePasoActual + 1} de {pasos.length}
                            </span>
                            <span className="font-mono text-xs text-bmo-subtle">
                                {Math.round(((indicePasoActual + 1) / pasos.length) * 100)}%
                            </span>
                        </div>
                        {/* Barra de progreso fija — no importa cuántos pasos haya */}
                        <div className="w-full h-1 bg-bmo-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-bmo-cyan rounded-full transition-all duration-300"
                                style={{ width: `${((indicePasoActual + 1) / pasos.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div
                        className="bg-bmo-dark border border-bmo-border border-l-2 border-l-bmo-green
                                rounded-lg px-4 py-3 font-mono text-sm text-bmo-muted leading-relaxed min-h-16"
                    >
                        {pasos[indicePasoActual]}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={retrocederPaso}
                        disabled={indicePasoActual === 0}
                        className="border border-bmo-border text-bmo-muted px-5 py-2.5 rounded-lg text-sm
                               hover:border-bmo-border-hover hover:text-bmo-text transition-all
                               disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        ← Atrás
                    </button>
                    <span className="font-mono text-xs text-bmo-subtle">
                        {indicePasoActual + 1} / {pasos.length}
                    </span>
                    {esUltimoPaso ? (
                        <button
                            onClick={irAResultado}
                            className="bg-bmo-green text-bmo-dark font-medium px-5 py-2.5
                                   rounded-lg text-sm hover:bg-bmo-green-hover transition-all"
                        >
                            Ver resultado →
                        </button>
                    ) : (
                        <button
                            onClick={avanzarPaso}
                            className="bg-bmo-cyan text-bmo-dark font-medium px-5 py-2.5
                                   rounded-lg text-sm hover:opacity-90 transition-all"
                        >
                            Siguiente →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
