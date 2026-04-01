type Props = {
  currentType: string;
  setType: (type: string) => void;
};

const TypeSelector = ({ currentType, setType }: Props) => {
  const types = [
    { id: "length", label: "Length", icon: "📏" },
    { id: "weight", label: "Weight", icon: "⚖️" },
    { id: "temperature", label: "Temperature", icon: "🌡️" },
    { id: "volume", label: "Volume", icon: "🧴" },
  ];

  return (
    <>
      <p className="section-title">Choose Type</p>
      <div className="type-grid">
        {types.map((t) => (
          <div
            key={t.id}
            className={`type-card ${currentType === t.id ? "active" : ""}`}
            onClick={() => setType(t.id)}
          >
            <span>{t.icon}</span>
            <p>{t.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TypeSelector;