
export interface User {
  email: string;
  name: string;
}

export interface ImageAdjustments {
  exposure: number;
  contrast: number;
  saturation: number;
  brightness: number;
}

export interface AIAnalysisResult {
  description: string;
  suggestions: string[];
}
