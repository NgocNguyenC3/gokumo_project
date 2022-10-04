import { useState } from "react";

export const History = (props) => {
    const [sortASC, setSortASC] = useState(true);
    return <div className="history">
        <div>
            Sort
            <button onClick={() => setSortASC(!sortASC)}>
                {sortASC ? "ASC" : "DSC"}
            </button>
        </div>
        <ol className={`${sortASC ? "" : "flex-reverse"}`}>
            {props.history.map((step, move) => {
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
                        className={`history-button ${move === props.state.stepNumber ? "history-selected" : " "
                            }`}
                    >
                        <button onClick={() => props.jumpToStep(move)}>{desc}</button>
                    </li>
                );
            })}
        </ol>
    </div>
}