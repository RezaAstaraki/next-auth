// export const errorResponse = {
//   isSuccess: false,
//   Errors: ["An error occurred while trying fetch"],

import { ApiError } from "@/actions/types";

// };
export const errorResponse:ApiError = {
  ok: false,
  status:500,
  message:'something went wrong'

};
