import React, { useState } from "react";
import "./Converter.css";

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [finalResult, setFinalResult] = useState([]);

  function convert(fromCurrency, toCurrency) {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=${fromCurrency},${toCurrency}`
    )
      .then((response) => response.json())

      .then((result) => setFinalResult(result["rates"][`${toCurrency}`]))

      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form>
        <center>
          <input
            className="form-control"
            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
            style={{ margin: "2%" }}
            type="text"
            id="fromCurrency"
            placeholder="From Currency"
            value={fromCurrency}
            required
          />

          <input
            className="form-control"
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            style={{ margin: "2%" }}
            type="text"
            id="toCurrency"
            placeholder="To Currency"
            value={toCurrency}
            required
          />
        </center>
        <br />
      </form>
      {toCurrency ? (
        <>
          <h3 onClick={convert(fromCurrency, toCurrency)}>Result</h3>

          <p id="output">
            1 {fromCurrency} = {parseFloat(finalResult).toFixed(2)} {toCurrency}
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Converter;
