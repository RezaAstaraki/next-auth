export type ApiResponse<TValue> =
  | { isSuccess: true; errors: string[]; value: TValue }
  | { isSuccess: false; errors: string[]; value: TValue | null };
