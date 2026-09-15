export interface PredictionRequest {
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

export interface PredictionResponse {
  predicted_price: number;
}