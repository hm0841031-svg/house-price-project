House Price Prediction

An end-to-end Machine Learning web application for predicting house prices based on property details.

Project Overview

This project builds a complete machine learning pipeline, from data preprocessing and model training to a FastAPI backend and React frontend.

The trained model predicts house prices based on features such as location, carpet area, number of bathrooms, balconies, parking spaces, floor number, furnishing, transaction type, ownership, and facing.

Dataset

The project uses the House Price by Juhi Bhojani dataset from Kaggle.

The raw CSV dataset is not included in the GitHub repository.

Machine Learning

Data Preprocessing

- Cleaned and parsed house price values.
- Converted carpet area values to square feet.
- Extracted numerical values from bathroom, balcony, and car parking columns.
- Parsed floor information.
- Grouped locations into the top 50 locations and an "other" category.
- Handled missing values using preprocessing pipelines.
- Removed extreme price-per-square-foot outliers.

Exploratory Data Analysis

The notebook includes multiple visualizations, including:

- House price distribution.
- Carpet area vs. price.
- Average price by location.
- Average price by number of bathrooms.

Models

Two regression models were trained and evaluated:

Model| MAE| RMSE| R²
Linear Regression| 4,558,858.61| 7,502,962.44| 0.7204
Random Forest| 1,252,790.70| 4,029,916.16| 0.9194

Best Model

The Random Forest Regressor achieved the best performance with:

- MAE: 1,252,790.70
- RMSE: 4,029,916.16
- R²: 0.9194

The trained model is saved as:

"backend/house_price.pkl"

Backend

The backend is built using FastAPI.

Main endpoints

Health Check

GET /health

Returns:

{
  "status": "ok"
}

Prediction

POST /predict

The endpoint receives property information and returns the predicted house price.

Run the backend

From the "backend" folder:

py -3.13 -m uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Swagger documentation:

http://127.0.0.1:8000/docs

Frontend

The frontend is built using:

- React
- TypeScript
- Vite

It provides a form where users can enter property details and receive the predicted house price.

Run the frontend

From the "frontend" folder:

npm install
npm run dev

The frontend will run at:

http://localhost:5173

Project Structure

house-price-project/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── house_price.pkl
│   ├── locations.json
│   ├── requirements.txt
│   └── tests/
│
├── frontend/
│   ├── public/
│   └── src/
│
├── notebooks/
│   └── house_price_model.ipynb
│
├── .gitignore
└── README.md

API Testing

The backend includes automated tests for:

- Health endpoint.
- Prediction endpoint.

Tests are run using:

pytest

Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- FastAPI
- Uvicorn
- React
- TypeScript
- Vite
- Git & GitHub

License

This project was created for educational purposes.