import { useState } from "react";
import "../styles/dashboard.css";

import Header from "../components/dashboard/Header";
import TypeSelector from "../components/dashboard/TypeSelector";
import ActionSelector from "../components/dashboard/ActionSelector";

import Comparison from "../components/dashboard/Comparison";
import Conversion from "../components/dashboard/Conversion";
import Arithmetic from "../components/dashboard/Arithmetic";

const DashboardPage = () => {
  const [type, setType] = useState("length");
  const [action, setAction] = useState("comparison");

  return (
    <>
      <Header />

      <div className="main">
        <TypeSelector currentType={type} setType={setType} />
        <ActionSelector action={action} setAction={setAction} />

        {action === "comparison" && <Comparison type={type} />}
        {action === "conversion" && <Conversion type={type} />}
        {action === "arithmetic" && <Arithmetic type={type} />}
      </div>
    </>
  );
};

export default DashboardPage;