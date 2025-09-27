"use client";

import {
  OpenModalType,
  setModalOpen,
} from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/src/redux/store";
import { useEffect } from "react";

export default function CallModal( props : OpenModalType) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log({props})
    dispatch(setModalOpen({...props}));
  }, [props]);
  return <></>;
}
