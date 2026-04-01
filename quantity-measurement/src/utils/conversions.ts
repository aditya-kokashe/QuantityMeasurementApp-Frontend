export const UNITS: any = {
  length: [
    { label: "Kilometer", factor: 1000 },
    { label: "Meter", factor: 1 },
    { label: "Centimeter", factor: 0.01 },
    { label: "Millimeter", factor: 0.001 },
    { label: "Mile", factor: 1609.34 },
    { label: "Foot", factor: 0.3048 },
    { label: "Inch", factor: 0.0254 },
  ],

  weight: [
    { label: "Kilogram", factor: 1 },
    { label: "Gram", factor: 0.001 },
    { label: "Milligram", factor: 0.000001 },
    { label: "Pound", factor: 0.453592 },
    { label: "Ounce", factor: 0.0283495 },
    { label: "Tonne", factor: 1000 },
  ],

  temperature: [
    { label: "Celsius" },
    { label: "Fahrenheit" },
    { label: "Kelvin" },
  ],

  volume: [
    { label: "Liter", factor: 1 },
    { label: "Milliliter", factor: 0.001 },
    { label: "Gallon", factor: 3.78541 },
    { label: "Cup", factor: 0.236588 },
    { label: "Tablespoon", factor: 0.0147868 },
  ],
};

export function convertTemp(val: number, from: string, to: string) {
  let kelvin;
  if (from === "Celsius") kelvin = val + 273.15;
  else if (from === "Fahrenheit") kelvin = (val - 32) * (5 / 9) + 273.15;
  else kelvin = val;

  if (to === "Celsius") return kelvin - 273.15;
  if (to === "Fahrenheit") return (kelvin - 273.15) * (9 / 5) + 32;
  return kelvin;
}

export function convertUnits(
  value: number,
  from: string,
  to: string,
  type: string
) {
  if (from === to) return value;
  if (type === "temperature") return convertTemp(value, from, to);

  const units = UNITS[type];
  const fromFactor = units.find((u: any) => u.label === from)?.factor || 1;
  const toFactor = units.find((u: any) => u.label === to)?.factor || 1;

  return (value * fromFactor) / toFactor;
}