import { useEffect, useState } from "react";
import { UNITS, convertUnits } from "../../utils/conversions";
import { quantityAPI } from "../../utils/api";
import type { QuantityDTO, QuantityMeasurementDTO } from "../../utils/api";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const units = UNITS[type];

        setFromUnit(units[0].label);
        setToUnit(units[1]?.label || units[0].label);
        setResultUnit(units[0].label);

        setFromVal(1);
        setToVal(1000);
        setError("");
    }, [type]);

    useEffect(() => {
        const performComparison = async () => {
            setLoading(true);
            setError("");

            try {
                const thisQuantity: QuantityDTO = {
                    value: fromVal,
                    unit: fromUnit,
                    measurementType: type,
                };

                const thatQuantity: QuantityDTO = {
                    value: toVal,
                    unit: toUnit,
                    measurementType: type,
                };

                const response: QuantityMeasurementDTO = await quantityAPI.compare(thisQuantity, thatQuantity);

                if (response.result !== undefined) {
                    setResult(String(response.result));
                } else if (response.error) {
                    setError(response.error);
                } else {
                    setResult(response.message || "Comparison completed");
                }
            } catch (err: any) {
                // Fallback to local calculation if API fails
                console.warn("Comparison API failed, using local calculation:", err);
                const fromConverted = convertUnits(fromVal, fromUnit, resultUnit, type);
                const toConverted = convertUnits(toVal, toUnit, resultUnit, type);

                let symbol = "=";
                if (fromConverted < toConverted) symbol = "<";
                else if (fromConverted > toConverted) symbol = ">";

                setResult(`${fromConverted} ${resultUnit} ${symbol} ${toConverted} ${resultUnit}`);
            } finally {
                setLoading(false);
            }
        };

        if (fromUnit && toUnit && resultUnit) {
            performComparison();
        }
    }, [fromVal, toVal, fromUnit, toUnit, resultUnit, type]);

    return (
        <div className="panel active">
            {error && <div style={{ color: "red", padding: "10px", marginBottom: "10px" }}>Error: {error}</div>}

            <div className="two-col">
                <div className="col-block">
                    <p className="col-title">From</p>
                    <input
                        className="big-input"
                        type="number"
                        value={fromVal}
                        onChange={(e) => setFromVal(Number(e.target.value))}
                        disabled={loading}
                    />
                    <select
                        className="unit-select"
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        disabled={loading}
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
                        disabled={loading}
                    />
                    <select
                        className="unit-select"
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
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

export default Comparison;