import { getCaptcha } from "@/actions/authActions";
import { useSuspenseQuery } from "@tanstack/react-query";



export async function getCaptchaClient() {
  // just call the server action from client
  return await getCaptcha();
}

export const useCaptcha = () => {
  const query = useSuspenseQuery({
    queryKey: ["getCaptcha"],
    queryFn: getCaptchaClient,
  });

  return query;
};
