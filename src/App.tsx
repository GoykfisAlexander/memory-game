import "./App.css";
import { useRef, useState } from "react";
import { Boxes } from "./components/Boxes";

function App() {
  const mixField = () => {
    const mixField: number[] = [];
    while (mixField.length !== 30) {
      const randomValue = Math.floor(Math.random() * 15);
      if (mixField.filter((e) => e === randomValue).length !== 2) {
        mixField.push(randomValue);
      }
    }
    return mixField;
  };
  const [field, setField] = useState(mixField());
  const [moves, setMoves] = useState(Array(30).fill(false));
  const [idPreviousBox, setIdPreviousBox] = useState(NaN);
  const [valuePreviousBox, setValuePreviousBox] = useState(NaN);
  const [counterMove, setCounterMove] = useState(0);
  const [backgrond, setBackground] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const shown = useRef(false);
  const shownCounter = useRef(0);
  const openBoxes = useRef(Array(15).fill(false));

  const refresh = () => {
    openBoxes.current = Array(15).fill(false);
    setMoves(Array(30).fill(false));
    setCounterMove(0);
    setIdPreviousBox(NaN);
    setValuePreviousBox(NaN);
    setField(mixField());
    setScore(0);
    setMistakes(0);
    shownCounter.current = 0;
    shown.current = false;
  };
  const show = () => {
    if (shown.current) {
      return;
    }
    shown.current = true;
    shownCounter.current++;
    const rememberMoves = [...moves];
    moves.fill(true);
    setMoves([...moves]);

    setTimeout(() => {
      shown.current = false;

      setMoves(rememberMoves);
    }, 1000);
  };

  return (
    <>
      <button className="button red" onClick={() => refresh()}>
        refresh
      </button>
      <button className="button green" onClick={() => show()}>
        show
      </button>
      <div className="info">{`Score:${score} Mistakes:${mistakes} Shown:${shownCounter.current}`}</div>

      <div className={`field ${backgrond}`}>
        {field.map((value, id) => (
          <Boxes
            key={id}
            id={id}
            value={value}
            openBoxes={openBoxes.current}
            shown={shown}
            counterMove={counterMove}
            setCounterMove={setCounterMove}
            idPreviousBox={idPreviousBox}
            setIdPreviousBox={setIdPreviousBox}
            moves={moves}
            setMoves={setMoves}
            valuePreviousBox={valuePreviousBox}
            setValuePreviousBox={setValuePreviousBox}
            setBackground={setBackground}
            setScore={setScore}
            setMistakes={setMistakes}
            refresh={refresh}
          />
        ))}
      </div>
    </>
  );
}
export default App;
