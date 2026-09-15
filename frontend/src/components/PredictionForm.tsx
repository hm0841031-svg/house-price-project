import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPrice } from "../api/predictionClient";

interface PredictionFormProps {
  onPrediction: (price: number) => void;
}

function PredictionForm({ onPrediction }: PredictionFormProps) {
  const navigate = useNavigate();

  const [locations, setLocations] = useState<string[]>([]);

  const [location, setLocation] = useState("");
  const [transaction, setTransaction] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [facing, setFacing] = useState("");
  const [ownership, setOwnership] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [balcony, setBalcony] = useState("");
  const [carParking, setCarParking] = useState("");
  const [floorNum, setFloorNum] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/locations.json")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch(() => {
        setError("Could not load locations.");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!location || !transaction || !furnishing) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(carpetArea) <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const result = await predictPrice({
        location,
        transaction,
        furnishing,
        facing: facing || null,
        ownership: ownership || null,
        carpet_area_sqft: Number(carpetArea),
        bathroom: Number(bathroom),
        balcony: Number(balcony),
        car_parking: Number(carParking),
        floor_num: Number(floorNum),
      });

      onPrediction(result.predicted_price);

      navigate("/result", {
        state: {
          price: result.predicted_price,
        },
      });
    } catch (err) {
      console.error(err);
      setError(
        "Prediction failed. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      <label>Location</label>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      >
        <option value="">Select Location</option>

        {locations.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label>Transaction</label>

      <select
        value={transaction}
        onChange={(e) => setTransaction(e.target.value)}
        required
      >
        <option value="">Select Transaction</option>
        <option value="New Property">New Property</option>
        <option value="Resale">Resale</option>
      </select>

      <label>Furnishing</label>

      <select
        value={furnishing}
        onChange={(e) => setFurnishing(e.target.value)}
        required
      >
        <option value="">Select Furnishing</option>
        <option value="Furnished">Furnished</option>
        <option value="Semi-Furnished">Semi-Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>

      <label>Facing</label>

      <input
        type="text"
        value={facing}
        onChange={(e) => setFacing(e.target.value)}
        placeholder="e.g. East"
      />

      <label>Ownership</label>

      <input
        type="text"
        value={ownership}
        onChange={(e) => setOwnership(e.target.value)}
        placeholder="e.g. Freehold"
      />

      <label>Carpet Area (sqft)</label>

      <input
        type="number"
        value={carpetArea}
        onChange={(e) => setCarpetArea(e.target.value)}
        placeholder="e.g. 1000"
        min="1"
        required
      />

      <label>Bathroom</label>

      <input
        type="number"
        value={bathroom}
        onChange={(e) => setBathroom(e.target.value)}
        min="0"
        required
      />

      <label>Balcony</label>

      <input
        type="number"
        value={balcony}
        onChange={(e) => setBalcony(e.target.value)}
        min="0"
        required
      />

      <label>Car Parking</label>

      <input
        type="number"
        value={carParking}
        onChange={(e) => setCarParking(e.target.value)}
        min="0"
        required
      />

      <label>Floor Number</label>

      <input
        type="number"
        value={floorNum}
        onChange={(e) => setFloorNum(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default PredictionForm;