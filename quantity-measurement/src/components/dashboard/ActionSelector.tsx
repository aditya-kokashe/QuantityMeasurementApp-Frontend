type Props = {
  action: string;
  setAction: (action: string) => void;
};

const ActionSelector = ({ action, setAction }: Props) => {
  const actions = ["comparison", "conversion", "arithmetic"];

  return (
    <>
      <p className="section-title">Choose Action</p>
      <div className="action-row">
        {actions.map((a) => (
          <button
            key={a}
            className={`action-btn ${action === a ? "active" : ""}`}
            onClick={() => setAction(a)}
          >
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
};

export default ActionSelector;