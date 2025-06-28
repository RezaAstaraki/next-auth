export type FailResponse = {
  message: string;
  Errors: {
    [fieldName: string]: string[];
  };
};
