import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import ResultPage from "./ResultPage";

function HomePage() {
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePrediction = (price: number) => {
    setPrediction(price);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>House Price Prediction</h1>

        <p className="subtitle">
          Enter the property details to predict its price.
        </p>

        <PredictionForm onPrediction={handlePrediction} />

        {prediction !== null && (
          <ResultPage price={prediction} />
        )}
      </div>
    </div>
  );
}

export default HomePage;