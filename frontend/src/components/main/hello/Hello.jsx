import React from "react";

const Hello = ({ firstname, error }) => {
  if (error) {
    return (
      <div className="analytics-element hello-component-container">
        <h1 className="hello-user" style={{ paddingTop: "30px" }}>
          Bonjour <span className="firstname">Inconnu</span>
        </h1>
      </div>
    );
  } else {
    return (
      <div className="analytics-element hello-component-container">
        <h1 className="hello-user">
          Bonjour <span className="firstname">{firstname}</span>
        </h1>
        <p className="motivation-message">
          Félicitation ! Vous avez explosé vos objectifs hier
          <span role="img" aria-label="Applaudissements">
            👏
          </span>
        </p>
      </div>
    );
  }
};

export default Hello;
