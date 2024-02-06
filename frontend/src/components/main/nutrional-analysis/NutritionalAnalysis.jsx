import "./nutrional-analysis.css";
import React from "react";

const NutritionalAnalysis = ({ image, label, value, error }) => {
  if (error) {
    return (
      <div className="nutritional-panel">
        <img
          src={require(`./nutrional-analysis-images/${image}`)}
          alt="Icone du macronutriment"
          className="macro-icon"
        />
        <div className="nutritional-data">
          <h4 className="error-message">Impossible de charger les donnés</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nutritional-panel">
        <img
          src={require(`./nutrional-analysis-images/${image}`)}
          alt="Icone du macronutriment"
          className="macro-icon"
        />
        <div className="nutritional-data">
          <h2 className="nutritional-value"> {value} </h2>
          <p className="nutritional-label"> {label}</p>
        </div>
      </div>
    );
  }
};

export default NutritionalAnalysis;
