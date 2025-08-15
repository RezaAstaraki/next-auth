export const clientUrlMaker = (endPoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API URL is not defined");
  }
  return `${baseUrl}${endPoint}`;
};

export const unAuthorizeHeader = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
