import "./Boxes.css";
interface IPropsBoxes {
  value: number;
  id: number;
  openBoxes: { current: boolean[] };
  moves: boolean[];
  setMoves: (value: boolean[]) => void;
  counterMove: number;
  setCounterMove: (value: number) => void;
  idPreviousBox: number;
  setIdPreviousBox: (value: number) => void;
  valuePreviousBox: number;
  setValuePreviousBox: (value: number) => void;
  setBackground: (value: string) => void;
  setScore: (value: number | ((p: number) => number)) => void;
  setMistakes: (value: number | ((p: number) => number)) => void;
  shown: { current: boolean };
}
export const Boxes = ({
  value,
  id,
  moves,
  setMoves,
  openBoxes,
  counterMove,
  setCounterMove,
  idPreviousBox,
  setIdPreviousBox,
  valuePreviousBox,
  setValuePreviousBox,
  setBackground,
  setMistakes,
  setScore,
  shown,
}: IPropsBoxes) => {
  function boxClick() {
    if (counterMove === 2 || moves[id]) {
      return;
    }

    shown.current = true;

    moves[id] = true;
    setMoves([...moves]);
    setCounterMove(counterMove + 1);
    setIdPreviousBox(id);
    setValuePreviousBox(value);

    if (value === valuePreviousBox) {
      setBackground("green");
      setScore((p: number) => p + 1);
      openBoxes.current[value] = true;
      setTimeout(() => setBackground(""), 1000);
      setCounterMove(0);
      setIdPreviousBox(NaN);
      setValuePreviousBox(NaN);
      shown.current = false;
      if (openBoxes.current.every((e: boolean) => e === true)) {
        setTimeout(() => {
          alert("красава");
        }, 500);
      }
      return;
    }
    if (counterMove === 1) {
      setBackground("red");
      setMistakes((p: number) => p + 1);
      setTimeout(() => {
        moves[id] = false;
        moves[idPreviousBox] = false;
        setMoves([...moves]);
        setCounterMove(0);
        setIdPreviousBox(NaN);
        setValuePreviousBox(NaN);
        setBackground("");
        shown.current = false;
      }, 1000);
    }
  }

  return (
    <div
      className="boxes"
      onClick={() => {
        boxClick();
      }}
    >
      <div
        className={`box ${
          !openBoxes.current[value] && counterMove < 2 ? "closed" : "cursor"
        }`}
      >
        {moves[id] && (
          <div
            className={`box ${!openBoxes.current[value] ? "open" : "cursor"}`}
          >
            <img
              className="img"
              src={`https://www.memozor.com/jeux/jquery/objects_diy/image${value}.jpg`}
              alt=""
            />
            {openBoxes.current[value] && <div className="box openBoxes "></div>}
          </div>
        )}
      </div>
    </div>
  );
};
