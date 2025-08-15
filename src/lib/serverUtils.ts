"server only";

export const ServerUrlMaker = (endPoint: string) => {
  const baseUrl = process.env.SERVER_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API URL is not defined");
  }
  return `${baseUrl}${endPoint}`;
};
