from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict():
    data = {
        "location": "mumbai",
        "transaction": "New Property",
        "furnishing": "Furnished",
        "facing": "East",
        "ownership": "Freehold",
        "carpet_area_sqft": 1000,
        "bathroom": 2,
        "balcony": 1,
        "car_parking": 1,
        "floor_num": 3
    }

    response = client.post("/predict", json=data)

    assert response.status_code == 200
    assert "predicted_price" in response.json()