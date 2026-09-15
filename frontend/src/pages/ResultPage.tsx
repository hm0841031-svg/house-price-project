import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const price = location.state?.price;

  if (price === undefined) {
    return (
      <div className="app">
        <div className="container">
          <h1>No Prediction Found</h1>

          <p className="subtitle">
            Please enter the property details first.
          </p>

          <button onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>House Price Prediction</h1>

        <div className="result">
          <h2>Predicted Price</h2>

          <p>₹ {price.toLocaleString("en-IN")}</p>
        </div>

        <button onClick={() => navigate("/")}>
          Predict Another Property
        </button>
      </div>
    </div>
  );
}

export default ResultPage;