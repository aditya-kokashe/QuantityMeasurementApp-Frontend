import { useEffect, useState } from "react";
import { UNITS, convertUnits } from "../../utils/conversions";
import { quantityAPI } from "../../utils/api";
import type { QuantityDTO, QuantityMeasurementDTO } from "../../utils/api";

type Props = {
    type: string;
};

const Arithmetic = ({ type }: Props) => {
    const units = UNITS[type] || [];

    const [val1, setVal1] = useState(1);
    const [val2, setVal2] = useState(1);

    const [unit1, setUnit1] = useState("");
    const [unit2, setUnit2] = useState("");
    const [resultUnit, setResultUnit] = useState("");
    const [op, setOp] = useState("+");

    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const units = UNITS[type];

        setUnit1(units[0].label);
        setUnit2(units[0].label);
        setResultUnit(units[0].label);

        setVal1(1);
        setVal2(1);
        setOp("+");
        setError("");
    }, [type]);

    useEffect(() => {
        const performOperation = async () => {
            setLoading(true);
            setError("");

            try {
                const thisQuantity: QuantityDTO = {
                    value: val1,
                    unit: unit1,
                    measurementType: type,
                };

                const thatQuantity: QuantityDTO = {
                    value: val2,
                    unit: unit2,
                    measurementType: type,
                };

                const targetQuantity: QuantityDTO = {
                    value: 0,
                    unit: resultUnit,
                    measurementType: type,
                };

                let response: QuantityMeasurementDTO;

                if (op === "+") {
                    response = await quantityAPI.add(thisQuantity, thatQuantity, targetQuantity);
                } else if (op === "-") {
                    response = await quantityAPI.subtract(thisQuantity, thatQuantity, targetQuantity);
                } else if (op === "/") {
                    if (val2 === 0) {
                        setError("Cannot divide by zero");
                        setResult("");
                        setLoading(false);
                        return;
                    }
                    response = await quantityAPI.divide(thisQuantity, thatQuantity);
                } else {
                    // Multiplication - handle locally since backend might not support it
                    throw new Error("Multiplication not yet supported from backend");
                }

                if (response.result !== undefined) {
                    setResult(`${val1} ${unit1} ${op} ${val2} ${unit2} = ${response.result} ${resultUnit}`);
                } else if (response.thatQuantityDTO?.value !== undefined) {
                    setResult(`${val1} ${unit1} ${op} ${val2} ${unit2} = ${response.thatQuantityDTO.value} ${resultUnit}`);
                } else if (response.error) {
                    setError(response.error);
                    setResult("");
                } else {
                    setResult(response.message || "Operation completed");
                }
            } catch (err: any) {
                // Fallback to local calculation if API fails
                console.warn("Arithmetic API failed, using local calculation:", err);

                const v1 = convertUnits(val1, unit1, resultUnit, type);
                const v2 = convertUnits(val2, unit2, resultUnit, type);

                let res: number | null = 0;

                if (op === "+") res = v1 + v2;
                else if (op === "-") res = v1 - v2;
                else if (op === "*") res = v1 * v2;
                else if (op === "/") res = v2 !== 0 ? v1 / v2 : null;

                if (res === null) {
                    setError("Cannot divide by zero");
                    setResult("");
                } else {
                    setResult(`${val1} ${unit1} ${op} ${val2} ${unit2} = ${res} ${resultUnit}`);
                }
            } finally {
                setLoading(false);
            }
        };

        if (unit1 && unit2 && resultUnit) {
            performOperation();
        }
    }, [val1, val2, unit1, unit2, resultUnit, op, type]);

    return (
        <div className="panel active">
            {error && <div style={{ color: "red", padding: "10px", marginBottom: "10px" }}>Error: {error}</div>}

            <div className="two-col">
                <div className="col-block">
                    <p className="col-title">Value 1</p>
                    <input
                        className="big-input"
                        type="number"
                        value={val1}
                        onChange={(e) => setVal1(Number(e.target.value))}
                        disabled={loading}
                    />
                    <select
                        className="unit-select"
                        value={unit1}
                        onChange={(e) => setUnit1(e.target.value)}
                        disabled={loading}
                    >
                        {units.map((u: any) => (
                            <option key={u.label}>{u.label}</option>
                        ))}
                    </select>
                </div>

                <div className="op-box">
                    <select value={op} onChange={(e) => setOp(e.target.value)} disabled={loading}>
                        <option value="+">+</option>
                        <option value="-">−</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                    </select>
                </div>

                <div className="col-block">
                    <p className="col-title">Value 2</p>
                    <input
                        className="big-input"
                        type="number"
                        value={val2}
                        onChange={(e) => setVal2(Number(e.target.value))}
                        disabled={loading}
                    />
                    <select
                        className="unit-select"
                        value={unit2}
                        onChange={(e) => setUnit2(e.target.value)}
                        disabled={loading}
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
                    <p className="result-text">{loading ? "Loading..." : result}</p>
                    <select
                        className="result-unit-select"
                        value={resultUnit}
                        onChange={(e) => setResultUnit(e.target.value)}
                        disabled={loading}
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

export default Arithmetic;