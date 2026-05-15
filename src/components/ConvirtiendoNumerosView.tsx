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
    const { indiceNumeroActual, numerosIngresados, guardarConversion, avanzarNumero } = useGame();

    useEffect(() => {
        const numeroActual = numerosIngresados[indiceNumeroActual];
        const tipoActual = numeroActual.tipo;
        console.log('indice:', indiceNumeroActual, 'tipo:', tipoActual);
        const valoresActuales = numeroActual.valores;

        const manejarSiguiente = () => {
            if (indiceNumeroActual < 4) {
                avanzarNumero();
            }
        };

        switch (tipoActual) {
            case 'fraccion': {
                const fraccion = {
                    numerador: parseInt(valoresActuales.numerador),
                    denominador: parseInt(valoresActuales.denominador),
                    esNegativo: numeroActual.esNegativo,
                };
                const { numerador, denominador, esNegativo } = fraccion;

                const convertir = async () => {
                    const response = await simplificarFraccion(numerador, denominador, esNegativo);
                    guardarConversion(response.data);
                    manejarSiguiente();
                };
                convertir();
                break;
            }

            case 'mixto': {
                const numeroMixto = {
                    numeroEntero: parseInt(valoresActuales.entero),
                    numerador: parseInt(valoresActuales.numerador),
                    denominador: parseInt(valoresActuales.denominador),
                    esNegativo: numeroActual.esNegativo,
                };
                const { numeroEntero, numerador, denominador, esNegativo } = numeroMixto;

                const convertir = async () => {
                    const response = await convertirMixto(numeroEntero, numerador, denominador, esNegativo);
                    guardarConversion(response.data);
                    manejarSiguiente();
                };
                convertir();
                break;
            }

            case 'decimal': {
                const numeroDecimal = { numero: valoresActuales.numero, esNegativo: numeroActual.esNegativo };
                const { numero, esNegativo } = numeroDecimal;

                const convertir = async () => {
                    const response = await convertirDecimal(numero, esNegativo);
                    guardarConversion(response.data);
                    manejarSiguiente();
                };
                convertir();
                break;
            }

            case 'periodicoPuro': {
                const periodicoPuro = {
                    numeroEntero: valoresActuales.numeroEntero,
                    numeroPeriodico: valoresActuales.numeroPeriodico,
                    esNegativo: numeroActual.esNegativo,
                };
                const { numeroEntero, numeroPeriodico, esNegativo } = periodicoPuro;

                const convertir = async () => {
                    const response = await convertirNumeroPeriodicoPuro(numeroEntero, numeroPeriodico, esNegativo);
                    guardarConversion(response.data);
                    manejarSiguiente();
                };
                convertir();
                break;
            }

            case 'periodicoMixto': {
                const periodicoMixto = {
                    numeroEntero: valoresActuales.numeroEntero,
                    numeroNoPeriodico: valoresActuales.numeroNoPeriodico,
                    numeroPeriodico: valoresActuales.numeroPeriodico,
                    esNegativo: numeroActual.esNegativo,
                };
                const { numeroEntero, numeroNoPeriodico, numeroPeriodico, esNegativo } = periodicoMixto;

                const convertir = async () => {
                    const response = await convertirNumeroPeriodicoMixto(
                        numeroEntero,
                        numeroNoPeriodico,
                        numeroPeriodico,
                        esNegativo
                    );
                    guardarConversion(response.data);
                    manejarSiguiente();
                };
                convertir();
                break;
            }
        }
    }, [indiceNumeroActual, numerosIngresados]);

    return (
        <>
            <div>
                <h1>Convirtiendo los numeros</h1>
            </div>
        </>
    );
};
