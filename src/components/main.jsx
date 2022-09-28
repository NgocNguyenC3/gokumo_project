import { useState } from "react";

export const Main = (props) => {

    const [state, setState] = useState({
        history: [
            {
                squares: Array(props.size * props.size).fill(null),
            },
        ],
        stepNumber: 0,
        xNext: true,
    });



    const [sortASC, setSortASC] = useState(true);
    const [isHoa, setHoa] = useState(false);
    const [winner, line] = findWinner(
        state.history[state.stepNumber].squares,
        props.size
    );
    const handleClick = (i) => {
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (findWinner(squares, props.size)[0] || squares[i]) {

            return;
        }
        squares[i] = state.xNext ? "X" : "O";

        setState({
            history: history.concat([
                {
                    squares: squares,
                    location: i,
                    isX: state.xNext,
                },
            ]),
            stepNumber: history.length,
            xNext: !state.xNext,
        });
        if (!squares.includes(null)) {
            setHoa(true)
        }

    };
    const jumpToStep = (step) => {
        setHoa(false)
        setState({
            ...state,
            stepNumber: step,
            xNext: step % 2 === 0,
        });
    };
    function findWinner(squares, size) {

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (squares[size * i + j] == null) {
                    continue;
                }
                let line = checkWin(squares, i, j, squares[size * i + j], size);
                console.log(line);
                if (line != null) {
                    return [squares[size * i + j], line];
                }
            }
        }
        return [null, null];
    }
    return (<div className="main">
        <div className="table-main" >
            <Table
                squares={state.history[state.stepNumber].squares}
                onClick={(i) => handleClick(i)}
                size={props.size}
                boldLine={line}
            />
        </div>
        <div className="info-main">
            <div>
                <div className="hoa">
                    {isHoa ? "Hòa" : ''}
                </div>
                {winner
                    ? "Winner: " + winner
                    : "Next player: " + (state.xNext ? "X" : "O")}
            </div>

            <div>
                Sort
                <button onClick={() => setSortASC(!sortASC)}>
                    {sortASC ? "ASC" : "DSC"}
                </button>
            </div>
            <ol className={`${sortASC ? "" : "flex-reverse"}`}>
                {state.history.map((step, move) => {
                    const desc = move
                        ? "Go to move #" +
                        move +
                        " " +
                        (step.isX ? "X" : "O") +
                        `(${step.location % props.size},${Math.floor(
                            step.location / props.size
                        )})`
                        : "Go to game start";
                    return (
                        <li
                            key={move}
                            className={`history-button ${move === state.stepNumber ? "history-selected" : " "
                                }`}
                        >
                            <button onClick={() => jumpToStep(move)}>{desc}</button>
                        </li>
                    );
                })}
            </ol>
        </div>
    </div>);


}


function checkWin(squares, i, j, data, size) {
    let result = [];
    let check = 0;
    // check hàng ngang
    console.log(i, j);
    if (size - 5 >= j) {
        for (let x = 0; x <= 4; x++) {
            if (data == squares[size * i + j + x]) {
                check++;
                result = [...result, size * i + j + x]
            } else {
                break;
            }
        }
        if (check == 5) {

            return result;
        } else {
            check = 0;
            result = [];
        }
    }

    // check hàng dọc 
    if (size - 5 >= i) {
        for (let x = 0; x <= 4; x++) {
            if (data == squares[size * (i + x) + j]) {
                check++;
                result = [...result, size * (i + x) + j];
            } else {
                break;
            }
        }
        if (check == 5) {
            return result;
        } else {
            check = 0;
            result = [];
        }
    }

    // check hàng chéo phải
    if (size - 5 >= j && size - 5 >= i) {
        for (let x = 0; x <= 4; x++) {
            if (data == squares[size * (i + x) + j + x]) {
                check++;
                result = [...result, size * (i + x) + j + x];
            } else {
                break;
            }
        }
        if (check == 5) {
            return result;
        } else {
            check = 0;
            result = [];
        }
    }

    // check hàng chéo trái
    if (size - 5 - 1 <= j && size - 5 >= i) {
        for (let x = 0; x <= 4; x++) {
            if (data == squares[size * (i + x) + j - x]) {
                check++;
                result = [...result, size * (i + x) + j - x];
            } else {
                break;
            }
        }
        if (check == 5) {
            return result;
        } else {
            check = 0;
            result = [];
        }
    }


    return null;
}

const Table = (props) => {
    const renderBox = (i) => {
        return (
            <button
                className={`box ${props.boldLine && props.boldLine.includes(i) ? "bold" : ""}`}
                onClick={() => props.onClick(i)}>
                {props.squares[i]}
            </button>
        );
    };

    return Array(props.size)
        .fill(null)
        .map((_, i) => {
            return (
                <div key={i} className="box-row">
                    {Array(props.size)
                        .fill(null)
                        .map((_, j) => {
                            return renderBox(i * props.size + j);
                        })}
                </div>
            );
        });
};


export default Main