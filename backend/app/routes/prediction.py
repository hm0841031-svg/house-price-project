from fastapi import APIRouter
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import predict_price


router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    predicted_price = predict_price(request.model_dump())

    return {
        "predicted_price": predicted_price
    }