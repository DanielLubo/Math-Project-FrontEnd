import './App.css';
import { ConvirtiendoNumerosView } from './components/ConvirtiendoNumerosView';
import { IngresandoView } from './components/IngresandoView';
import { OperandoView } from './components/OperandoView';
import { ResultadoView } from './components/ResultadoView';
import { useGame } from './hooks/useGame';



function App() {

    const { fase } = useGame();

    const renderFase = () => {
        switch(fase) {
            case 'convirtiendo': return <ConvirtiendoNumerosView/>;
            case 'ingresando' : return <IngresandoView/>;
            case 'operando' : return <OperandoView/>;
            case 'resultado' : return <ResultadoView/>;
        }
    }

    return (
        <>
            {renderFase()}
        </>
    );
}

export default App;
