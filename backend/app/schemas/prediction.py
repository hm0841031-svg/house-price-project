from pydantic import BaseModel


class PredictionRequest(BaseModel):
    location: str
    transaction: str
    furnishing: str
    facing: str | None = None
    ownership: str | None = None
    carpet_area_sqft: float
    bathroom: float
    balcony: float
    car_parking: float
    floor_num: float


class PredictionResponse(BaseModel):
    predicted_price: float