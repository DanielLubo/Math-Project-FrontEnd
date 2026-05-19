import { useGame } from '../hooks/useGame';

export const ResultadoView = () => {
    const { resultadoFinal } = useGame();

    if (!resultadoFinal)
        return (
            <div className="min-h-screen bg-bmo-dark flex items-center justify-center font-mono text-bmo-muted">
                Sin resultado
            </div>
        );

    const { fraccion, pasos } = resultadoFinal;
    const signo = fraccion.esNegativo ? '-' : '';

    return (
        <div className="min-h-screen bg-bmo-dark text-bmo-text flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md flex flex-col gap-6">
                <div>
                    <p className="text-xs tracking-widest text-bmo-green uppercase font-mono">resultado final</p>
                    <h1 className="text-2xl font-light text-bmo-text mt-1">
                        Operación <span className="text-bmo-green font-medium">completada</span>
                    </h1>
                </div>

                {/* Fracción grande centrada */}
                <div className="bg-bmo-surface border border-bmo-border rounded-xl p-6 flex justify-center">
                    <div className="flex items-center gap-3">
                        {signo && <span className="font-mono text-3xl text-bmo-muted">{signo}</span>}
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-mono text-4xl font-bold text-bmo-green">{fraccion.numerador}</span>
                            <div className="w-14 h-0.5 bg-bmo-text rounded-full" />
                            <span className="font-mono text-4xl font-bold text-bmo-green">{fraccion.denominador}</span>
                        </div>
                    </div>
                </div>

                {/* Lista de pasos */}
                <div className="bg-bmo-surface border border-bmo-border rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-xs tracking-widest text-bmo-muted uppercase font-mono">pasos de la operación</p>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                        {pasos.map((paso, index) => (
                            <div
                                key={index}
                                className="font-mono text-xs text-bmo-muted bg-bmo-dark border border-bmo-border
                                        rounded-lg px-3 py-2 leading-relaxed"
                            >
                                {index + 1}. {paso}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
