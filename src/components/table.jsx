export const Table = (props) => {
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


export default Table