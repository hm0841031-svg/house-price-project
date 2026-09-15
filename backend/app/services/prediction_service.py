import json
import joblib
import pandas as pd
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "house_price.pkl"
LOCATIONS_PATH = BASE_DIR / "locations.json"


model = joblib.load(MODEL_PATH)

with open(LOCATIONS_PATH, "r", encoding="utf-8") as f:
    locations = json.load(f)


def predict_price(data: dict) -> float:
    location = data["location"]

    location_grouped = (
        location if location in locations else "other"
    )

    input_data = pd.DataFrame([{
        "Transaction": data["transaction"],
        "Furnishing": data["furnishing"],
        "facing": data.get("facing"),
        "Ownership": data.get("ownership"),
        "carpet_area_sqft": data["carpet_area_sqft"],
        "bathroom": data["bathroom"],
        "balcony": data["balcony"],
        "car_parking": data["car_parking"],
        "floor_num": data["floor_num"],
        "location_grouped": location_grouped,
    }])

    prediction = model.predict(input_data)[0]

    return float(prediction)