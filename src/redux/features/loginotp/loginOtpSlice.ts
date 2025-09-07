import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OtpSliceType = {
  request_id: string;
  expires_at: string;
  step: "MobileStep" | "SendOtpStep";
  mobile: string;
};

const resetState: OtpSliceType = {
  request_id: "",
  expires_at: "",
  step: "MobileStep",
  mobile: "",
};

// ✅ Load from localStorage if exists
const loadOtpFromStorage = (): OtpSliceType => {
  if (typeof window === "undefined") return resetState;

  const stored = localStorage.getItem("otp");
  if (stored) {
    try {
      const otpState = JSON.parse(stored) as OtpSliceType;

      const isExpired =
        !otpState.expires_at ||
        new Date(otpState.expires_at).getTime() <= Date.now();

      const isInvalid = !otpState.mobile || !otpState.request_id;

      if (isExpired || isInvalid) {
        localStorage.setItem("otp", JSON.stringify(resetState));
        return resetState;
      }

      return otpState;
    } catch {
      return resetState;
    }
  }

  return resetState;
};

const initialState: OtpSliceType = loadOtpFromStorage();

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setStep: (
      state,
      action: PayloadAction<{ step: "MobileStep" | "SendOtpStep" }>
    ) => {
      state.step = action.payload.step;
      if (typeof window !== "undefined") {
        localStorage.setItem("otp", JSON.stringify(state));
      }
    },
    setOtp: (state, action: PayloadAction<OtpSliceType>) => {
      state.request_id = action.payload.request_id;
      state.expires_at = action.payload.expires_at;
      state.step = action.payload.step;
      state.mobile = action.payload.mobile;

      if (typeof window !== "undefined") {
        localStorage.setItem("otp", JSON.stringify(state));
      }
    },
    resetOtp: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("otp");
      }
      return resetState;
    },
  },
});

export const { setStep, setOtp, resetOtp } = otpSlice.actions;
export default otpSlice.reducer;
