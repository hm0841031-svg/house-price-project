interface ResultPageProps {
  price: number;
}

function ResultPage({ price }: ResultPageProps) {
  return (
    <div className="result">
      <h2>Predicted Price</h2>

      <p>₹ {price.toLocaleString("en-IN")}</p>
    </div>
  );
}

export default ResultPage;