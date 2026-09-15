import PredictionForm from "../components/PredictionForm";

function HomePage() {
  return (
    <div className="app">
      <div className="container">
        <h1>House Price Prediction</h1>

        <p className="subtitle">
          Enter the property details to predict its price.
        </p>

        <PredictionForm
          onPrediction={() => {
            // The prediction result is displayed on the result page.
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;