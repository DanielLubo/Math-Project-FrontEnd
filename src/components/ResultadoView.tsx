import { useGame } from '../hooks/useGame';

export const ResultadoView = () => {
    const { resultadoFinal } = useGame();

    if (!resultadoFinal) return <div>Sin resultado</div>;

    const { fraccion, pasos } = resultadoFinal;
    const signo = fraccion.esNegativo ? '-' : '';

    return (
        <div>
            <h1>Resultado Final</h1>
            <h2>
                {signo}
                {fraccion.numerador}/{fraccion.denominador}
            </h2>
            <h3>Pasos de la operación:</h3>
            {pasos.map((paso, index) => (
                <p key={index}>{paso}</p>
            ))}
        </div>
    );
};
