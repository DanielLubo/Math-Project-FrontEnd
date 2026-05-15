import type { ResultadoOperacion } from '../types';
import axiosInstance from './axiosInstance';

export const simplificarFraccion = (numerador: number, denominador: number, esNegativo: boolean) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/simplificar', { numerador, denominador, esNegativo });

export const convertirMixto = (
    numeroEntero: number,
    numerador: number,
    denominador: number,
    esNegativo: boolean
) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/mixto', {
        numeroEntero,
        numerador,
        denominador,
        esNegativo,
    });

export const convertirDecimal = (numero: string, esNegativo: boolean) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/decimal', { numero, esNegativo });

export const convertirNumeroPeriodicoPuro = (numeroEntero: string, numeroPeriodico: string, esNegativo: boolean) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/periodico-puro', { numeroEntero, numeroPeriodico,esNegativo });

export const convertirNumeroPeriodicoMixto = (
    numeroEntero: string,
    numeroNoPeriodico: string,
    numeroPeriodico: string,
    esNegativo: boolean
) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/periodico-mixto', {
        numeroEntero,
        numeroNoPeriodico,
        numeroPeriodico,
        esNegativo,
    });

export const operar = (fracciones: { numerador: number; denominador: number; esNegativo: boolean }[]) =>
    axiosInstance.post<ResultadoOperacion>('/convertir/operar', { fracciones });
