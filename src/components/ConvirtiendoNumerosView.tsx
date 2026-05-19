import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import {
    convertirDecimal,
    convertirMixto,
    convertirNumeroPeriodicoMixto,
    convertirNumeroPeriodicoPuro,
    simplificarFraccion,
} from '../api/calculadora';

export const ConvirtiendoNumerosView = () => {
    const {
        indiceNumeroActual,
        numerosIngresados,
        resultadosConversion,
        guardarConversion,
        avanzarNumero,
        indicePasoActual,
        avanzarPaso,
        retrocederPaso,
        irAOperando,
    } = useGame();

    const conversionActual = resultadosConversion[indiceNumeroActual];

    useEffect(() => {
        if (resultadosConversion[indiceNumeroActual]) return;

        const numeroActual = numerosIngresados[indiceNumeroActual];
        const tipoActual = numeroActual.tipo;
        const valoresActuales = numeroActual.valores;

        switch (tipoActual) {
            case 'fraccion': {
                const { numerador, denominador, esNegativo } = {
                    numerador: parseInt(valoresActuales.numerador),
                    denominador: parseInt(valoresActuales.denominador),
                    esNegativo: numeroActual.esNegativo,
                };
                const convertir = async () => {
                    const response = await simplificarFraccion(numerador, denominador, esNegativo);
                    guardarConversion(response.data);
                };
                convertir();
                break;
            }
            case 'mixto': {
                const { numeroEntero, numerador, denominador, esNegativo } = {
                    numeroEntero: parseInt(valoresActuales.entero),
                    numerador: parseInt(valoresActuales.numerador),
                    denominador: parseInt(valoresActuales.denominador),
                    esNegativo: numeroActual.esNegativo,
                };
                const convertir = async () => {
                    const response = await convertirMixto(numeroEntero, numerador, denominador, esNegativo);
                    guardarConversion(response.data);
                };
                convertir();
                break;
            }
            case 'decimal': {
                const { numero, esNegativo } = {
                    numero: valoresActuales.numero,
                    esNegativo: numeroActual.esNegativo,
                };
                const convertir = async () => {
                    const response = await convertirDecimal(numero, esNegativo);
                    guardarConversion(response.data);
                };
                convertir();
                break;
            }
            case 'periodicoPuro': {
                const { numeroEntero, numeroPeriodico, esNegativo } = {
                    numeroEntero: valoresActuales.numeroEntero,
                    numeroPeriodico: valoresActuales.numeroPeriodico,
                    esNegativo: numeroActual.esNegativo,
                };
                const convertir = async () => {
                    const response = await convertirNumeroPeriodicoPuro(numeroEntero, numeroPeriodico, esNegativo);
                    guardarConversion(response.data);
                };
                convertir();
                break;
            }
            case 'periodicoMixto': {
                const { numeroEntero, numeroNoPeriodico, numeroPeriodico, esNegativo } = {
                    numeroEntero: valoresActuales.numeroEntero,
                    numeroNoPeriodico: valoresActuales.numeroNoPeriodico,
                    numeroPeriodico: valoresActuales.numeroPeriodico,
                    esNegativo: numeroActual.esNegativo,
                };
                const convertir = async () => {
                    const response = await convertirNumeroPeriodicoMixto(
                        numeroEntero,
                        numeroNoPeriodico,
                        numeroPeriodico,
                        esNegativo
                    );
                    guardarConversion(response.data);
                };
                convertir();
                break;
            }
        }
    }, [indiceNumeroActual, numerosIngresados, resultadosConversion]);

    if (!conversionActual)
        return (
            <div className="min-h-screen bg-bmo-dark flex items-center justify-center font-mono text-bmo-cyan">
                Convirtiendo...
            </div>
        );

    const pasos = conversionActual.pasos;
    const esUltimoPaso = indicePasoActual === pasos.length - 1;
    const esUltimoNumero = indiceNumeroActual === 4;

    const handleSiguiente = () => {
        if (esUltimoPaso) {
            if (esUltimoNumero) irAOperando();
            else avanzarNumero();
        } else {
            avanzarPaso();
        }
    };

    return (
        <div className="min-h-screen bg-bmo-dark text-bmo-text flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md flex flex-col gap-6">
                <div>
                    <p className="text-xs tracking-widest text-bmo-cyan uppercase font-mono">
                        convirtiendo · número {indiceNumeroActual + 1} de 5
                    </p>
                    <h1 className="text-2xl font-light text-bmo-text mt-1">
                        Número <span className="text-bmo-cyan font-medium">{indiceNumeroActual + 1}</span> al sistema
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
                    </div>{' '}
                    <div
                        className="bg-bmo-dark border border-bmo-border border-l-2 border-l-bmo-cyan
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
                    <button
                        onClick={handleSiguiente}
                        className="bg-bmo-cyan text-bmo-dark font-medium px-5 py-2.5
                               rounded-lg text-sm hover:opacity-90 transition-all"
                    >
                        {esUltimoPaso && esUltimoNumero
                            ? 'Continuar →'
                            : esUltimoPaso
                              ? 'Siguiente número →'
                              : 'Siguiente paso →'}
                    </button>
                </div>
            </div>
        </div>
    );
};
