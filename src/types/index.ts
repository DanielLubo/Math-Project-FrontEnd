export interface Fraccion {
    numerador: number;
    denominador: number;
    esNegativo: boolean;
}

export interface ResultadoOperacion {
    fraccion: Fraccion;
    pasos: string[];
}

export type TipoNumero = 'fraccion' | 'mixto' | 'decimal' | 'periodicoPuro' | 'periodicoMixto';

export interface NumeroIngresado {
    tipo: TipoNumero;
    esNegativo: boolean;
    valores: Record<string, string>;
}

export type Fase = 'ingresando' | 'convirtiendo' | 'operando' | 'resultado';
