from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load the trained model
model = joblib.load("house_price.pkl")

class HouseData(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int


@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}


@app.post("/predict")
def predict(data: HouseData):
    features = np.array([[data.area, data.bedrooms, data.bathrooms]])

    prediction = model.predict(features)[0]

    return {
        "predicted_price": float(prediction)
    }