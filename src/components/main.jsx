import { useState } from "react";
import { Table } from "./table.jsx";
import { History } from "./history.jsx";
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

            <div className="info">
                <History
                    jumpToStep={(step) => {
                        setHoa(false)
                        setState({
                            ...state,
                            stepNumber: step,
                            xNext: step % 2 === 0,
                        });
                    }}
                    history={state.history}
                    state = {state}
                    size = {props.size}
                />
            </div>
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


export default Main