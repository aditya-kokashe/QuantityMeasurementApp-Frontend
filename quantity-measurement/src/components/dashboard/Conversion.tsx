import { useEffect, useState } from "react";
import { UNITS, convertUnits } from "../../utils/conversions";
import { quantityAPI } from "../../utils/api";
import type { QuantityDTO, QuantityMeasurementDTO } from "../../utils/api";

type Props = {
    type: string;
};

const Conversion = ({ type }: Props) => {
    const units = UNITS[type] || [];

    const [val, setVal] = useState(1);
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const units = UNITS[type];

        setFromUnit(units[0].label);
        setToUnit(units[1]?.label || units[0].label);
        setVal(1);
        setError("");
    }, [type]);

    useEffect(() => {
        const performConversion = async () => {
            setLoading(true);
            setError("");

            try {
                const thisQuantity: QuantityDTO = {
                    value: val,
                    unit: fromUnit,
                    measurementType: type,
                };

                const thatQuantity: QuantityDTO = {
                    value: 0, // Placeholder, backend will handle conversion
                    unit: toUnit,
                    measurementType: type,
                };

                const response: QuantityMeasurementDTO = await quantityAPI.convert(thisQuantity, thatQuantity);

                if (response.result !== undefined) {
                    setResult(`${val} ${fromUnit} = ${response.result} ${toUnit}`);
                } else if (response.thatQuantityDTO?.value !== undefined) {
                    setResult(`${val} ${fromUnit} = ${response.thatQuantityDTO.value} ${toUnit}`);
                } else if (response.error) {
                    setError(response.error);
                    setResult("");
                } else {
                    setResult(response.message || "Conversion completed");
                }
            } catch (err: any) {
                // Fallback to local calculation if API fails
                console.warn("Conversion API failed, using local calculation:", err);
                const res = convertUnits(val, fromUnit, toUnit, type);
                setResult(`${val} ${fromUnit} = ${res} ${toUnit}`);
            } finally {
                setLoading(false);
            }
        };

        if (fromUnit && toUnit) {
            performConversion();
        }
    }, [val, fromUnit, toUnit, type]);

    return (
        <div className="panel active">
            {error && <div style={{ color: "red", padding: "10px", marginBottom: "10px" }}>Error: {error}</div>}

            <div className="two-col">
                <div className="col-block">
                    <p className="col-title">Value</p>
                    <input
                        className="big-input"
                        type="number"
                        value={val}
                        onChange={(e) => setVal(Number(e.target.value))}
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

                <div className="arrow">→</div>

                <div className="col-block">
                    <p className="col-title">Convert To</p>
                    <br />
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
                <p className="result-text">{loading ? "Loading..." : result}</p>
            </div>
        </div>
    );
};

export default Conversion;