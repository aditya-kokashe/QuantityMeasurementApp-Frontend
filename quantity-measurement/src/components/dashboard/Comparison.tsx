import { useEffect, useState } from "react";
import { UNITS, convertUnits } from "../../utils/conversions";

type Props = {
    type: string;
};

const Comparison = ({ type }: Props) => {
    const units = UNITS[type] || [];

    const [fromVal, setFromVal] = useState(1);
    const [toVal, setToVal] = useState(1000);

    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [resultUnit, setResultUnit] = useState("");

    const [result, setResult] = useState("");

    useEffect(() => {
        const units = UNITS[type];

        setFromUnit(units[0].label);
        setToUnit(units[1]?.label || units[0].label);
        setResultUnit(units[0].label);

        setFromVal(1);
        setToVal(1000);
    }, [type]);

    useEffect(() => {
        const fromConverted = convertUnits(fromVal, fromUnit, resultUnit, type);
        const toConverted = convertUnits(toVal, toUnit, resultUnit, type);

        let symbol = "=";
        if (fromConverted < toConverted) symbol = "<";
        else if (fromConverted > toConverted) symbol = ">";

        setResult(
            `${fromConverted} ${resultUnit} ${symbol} ${toConverted} ${resultUnit}`
        );
    }, [fromVal, toVal, fromUnit, toUnit, resultUnit, type]);

    return (
        <div className="panel active">
            <div className="two-col">
                <div className="col-block">
                    <p className="col-title">From</p>
                    <input
                        className="big-input"
                        type="number"
                        value={fromVal}
                        onChange={(e) => setFromVal(Number(e.target.value))}
                    />
                    <select
                        className="unit-select"
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                    >
                        {units.map((u: any) => (
                            <option key={u.label}>{u.label}</option>
                        ))}
                    </select>
                </div>

                <div className="col-block">
                    <p className="col-title">To</p>
                    <input
                        className="big-input"
                        type="number"
                        value={toVal}
                        onChange={(e) => setToVal(Number(e.target.value))}
                    />
                    <select
                        className="unit-select"
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                    >
                        {units.map((u: any) => (
                            <option key={u.label}>{u.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="result-box">
                <p className="result-title">Result</p>
                <div className="result-row">
                    <p className="result-text">{result}</p>
                    <select
                        className="result-unit-select"
                        value={resultUnit}
                        onChange={(e) => setResultUnit(e.target.value)}
                    >
                        {units.map((u: any) => (
                            <option key={u.label}>{u.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Comparison;