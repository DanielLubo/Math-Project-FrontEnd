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
        <>
            <div>
                <h1>Ingresando los numeros: </h1>
                <button onClick={() => setEsNegativo((prev) => !prev)}>{esNegativo ? 'Negativo' : 'Positivo'}</button>
                {camposActuales.map((campo) => (
                    <input
                        key={campo}
                        value={valores[campo] ?? ''}
                        onChange={(e) => handleChange(campo, e.target.value)}
                        className="border border-white text-white bg-transparent px-2 py-1"
                    />
                ))}
                <button onClick={() => handleConfirmar()}>Agregar Numero</button>
            </div>
        </>
    );
};
