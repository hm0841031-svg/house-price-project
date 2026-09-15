const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export interface PredictionData {
  location: string;
  transaction: string;
  furnishing: string;
  facing?: string | null;
  ownership?: string | null;
  carpet_area_sqft: number;
  bathroom: number;
  balcony: number;
  car_parking: number;
  floor_num: number;
}

export async function predictPrice(data: PredictionData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}