import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OtpSliceType = {
  request_id: string;
  expires_at: string;
  step: "MobileStep" | "SendOtpStep";
  mobile:string
};

// ✅ Load from localStorage if exists
const loadOtpFromStorage = (): OtpSliceType => {
  if (typeof window === "undefined") return { request_id: "0", expires_at: "0", step: "MobileStep" ,mobile:""};

  const stored = localStorage.getItem("otp");
  if (stored) {
    try {
      return JSON.parse(stored) as OtpSliceType;
    } catch {
      return { request_id: "0", expires_at: "0", step: "MobileStep",mobile:"" };
    }
  }
  return { request_id: "0", expires_at: "0", step: "MobileStep" ,mobile:""};
};

const initialState: OtpSliceType = loadOtpFromStorage();

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<{ step: "MobileStep" | "SendOtpStep"}>) => {
      state.step = action.payload.step;

      // ✅ Save back to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("otp", JSON.stringify(state));
      }
    },
    setOtp: (state, action: PayloadAction<OtpSliceType>) => {
      state.request_id = action.payload.request_id;
      state.expires_at = action.payload.expires_at;
      state.step = action.payload.step;

      if (typeof window !== "undefined") {
        localStorage.setItem("otp", JSON.stringify(state));
      }
    },
    resetOtp: () => {
      const resetState: OtpSliceType = { request_id: "0", expires_at: "0", step: "MobileStep",mobile:"" };
      if (typeof window !== "undefined") {
        localStorage.removeItem("otp");
      }
      return resetState;
    },
  },
});

export const { setStep, setOtp, resetOtp } = otpSlice.actions;
export default otpSlice.reducer;
