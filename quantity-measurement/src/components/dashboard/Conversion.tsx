import { useEffect, useState } from "react";
import { UNITS, convertUnits } from "../../utils/conversions";

type Props = {
    type: string;
};

const Conversion = ({ type }: Props) => {
    const units = UNITS[type] || [];

    const [val, setVal] = useState(1);
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        const units = UNITS[type];

        setFromUnit(units[0].label);
        setToUnit(units[1]?.label || units[0].label);
        setVal(1);
    }, [type]);

    useEffect(() => {
        const res = convertUnits(val, fromUnit, toUnit, type);
        setResult(`${val} ${fromUnit} = ${res} ${toUnit}`);
    }, [val, fromUnit, toUnit, type]);

    return (
        <div className="panel active">
            <div className="two-col">
                <div className="col-block">
                    <p className="col-title">Value</p>
                    <input
                        className="big-input"
                        type="number"
                        value={val}
                        onChange={(e) => setVal(Number(e.target.value))}
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

                <div className="arrow">→</div>

                <div className="col-block">
                    <p className="col-title">Convert To</p>
                    <br />
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
                <p className="result-text">{result}</p>
            </div>
        </div>
    );
};

export default Conversion;