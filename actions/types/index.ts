// export type ApiResponse<TValue> =
//   | { isSuccess: true; errors: string[]; value: TValue }
//   | { isSuccess: false; errors: string[]; value: TValue | null };
// Generic API success response


export type ApiError = {
  ok: false;
  message: string;
  errors?: Record<string, string[]>;
  status: number;
};

export type ApiSuccess<T> = {
  ok: true;
  status: number;
  body: T;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;