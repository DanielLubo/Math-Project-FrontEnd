import type { TipoNumero } from '../types';
import { useGame } from '../hooks/useGame';
import { useState } from 'react';
import type { NumeroIngresado } from '../types';

const TIPOS_EN_ORDEN: TipoNumero[] = ['fraccion', 'mixto', 'decimal', 'periodicoPuro', 'periodicoMixto'];

const CAMPOS_POR_TIPO: Record<TipoNumero, string[]> = {
    fraccion: ['numerador', 'denominador'],
    mixto: ['entero', 'numerador', 'denominador'],
    decimal: ['numero'],
    periodicoPuro: ['numeroEntero', 'numeroPeriodico'],
    periodicoMixto: ['numeroEntero', 'numeroNoPeriodico', 'numeroPeriodico'],
};

export const IngresandoView = () => {
    const [valores, setValores] = useState<Record<string, string>>({});
    const [esNegativo, setEsNegativo] = useState<boolean>(false);
    const { indiceNumeroActual, agregarNumero, numerosIngresados } = useGame();

    const tipoActual = TIPOS_EN_ORDEN[indiceNumeroActual];
    const camposActuales = CAMPOS_POR_TIPO[tipoActual];

    const handleChange = (campo: string, valor: string) => {
        setValores((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleConfirmar = () => {
        const numero: NumeroIngresado = {
            tipo: tipoActual,
            esNegativo: esNegativo,
            valores: valores,
        };

        const todosLlenosLlenos = camposActuales.every(
            (campo) => valores[campo] !== undefined && valores[campo].trim() !== ''
        );
        if (todosLlenosLlenos) {
            agregarNumero(numero);
            setValores({});
            setEsNegativo(false);
            console.log(numerosIngresados);
        }
    };

    return (
        <div className="min-h-screen bg-bmo-dark text-bmo-text flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md flex flex-col gap-6">
                {/* Label + título */}
                <div>
                    <p className="text-xs tracking-widest text-bmo-cyan uppercase font-mono">
                        número {indiceNumeroActual + 1} de 5
                    </p>
                    <h1 className="text-2xl font-light text-bmo-text mt-1">
                        Ingresa la <span className="text-bmo-green font-medium">{tipoActual}</span>
                    </h1>
                </div>

                {/* Card del formulario */}
                <div className="bg-bmo-surface border border-bmo-border rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-bmo-muted">
                            Tipo: <span className="text-bmo-text">{tipoActual}</span>
                        </span>
                        <button
                            onClick={() => setEsNegativo((prev) => !prev)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                                esNegativo
                                    ? 'border-bmo-red text-bmo-red bg-bmo-red-bg'
                                    : 'border-bmo-green text-bmo-green bg-bmo-green-bg'
                            }`}
                        >
                            {esNegativo ? '− Negativo' : '+ Positivo'}
                        </button>
                    </div>

                    {camposActuales.map((campo) => (
                        <div key={campo} className="flex flex-col gap-1.5">
                            <label className="text-xs text-bmo-muted capitalize">{campo}</label>
                            <input
                                value={valores[campo] ?? ''}
                                onChange={(e) => handleChange(campo, e.target.value)}
                                placeholder={
                                    campo === 'numerador' ? 'ej. 3' : campo === 'denominador' ? 'ej. 4' : 'ej. 0'
                                }
                                className="bg-bmo-dark border border-bmo-border-hover rounded-lg px-3 py-2
                         text-sm text-bmo-text font-mono outline-none
                         focus:border-bmo-cyan transition-colors"
                            />
                        </div>
                    ))}
                </div>

                {/* Progreso + botón */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${
                                    i < indiceNumeroActual
                                        ? 'w-3 bg-bmo-green'
                                        : i === indiceNumeroActual
                                          ? 'w-5 bg-bmo-cyan'
                                          : 'w-1.5 bg-bmo-border'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleConfirmar}
                        className="bg-bmo-green text-bmo-dark font-medium px-5 py-2.5
                     rounded-lg text-sm hover:bg-bmo-green-hover transition-colors"
                    >
                        Agregar número →
                    </button>
                </div>
            </div>
        </div>
    );
};
