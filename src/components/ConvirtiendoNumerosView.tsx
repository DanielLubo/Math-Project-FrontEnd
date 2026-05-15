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

    if (!conversionActual) return <div>Convirtiendo...</div>;

    const pasos = conversionActual.pasos;
    const esUltimoPaso = indicePasoActual === pasos.length - 1;
    const esUltimoNumero = indiceNumeroActual === 4;

    const handleSiguiente = () => {
        if (esUltimoPaso) {
            if (!esUltimoNumero) {
                avanzarNumero();
            }
        } else {
            avanzarPaso();
        }
    };

    return (
        <div>
            <h1>Convirtiendo número {indiceNumeroActual + 1} de 5</h1>
            <p>{pasos[indicePasoActual]}</p>
            <button onClick={retrocederPaso} disabled={indicePasoActual === 0}>
                Atrás
            </button>
            {esUltimoPaso && esUltimoNumero ? null : (
                <button onClick={handleSiguiente}>{esUltimoPaso ? 'Siguiente número' : 'Siguiente paso'}</button>
            )}
        </div>
    );
};
