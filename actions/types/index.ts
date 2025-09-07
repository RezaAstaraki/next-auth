// export type ApiResponse<TValue> =
//   | { isSuccess: true; errors: string[]; value: TValue }
//   | { isSuccess: false; errors: string[]; value: TValue | null };
// Generic API success response
export type ApiSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

// Error response with optional field errors
export type ApiError = {
  ok: false;
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};

// Union type (either success or error)
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
