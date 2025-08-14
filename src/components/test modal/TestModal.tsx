"use client";

import { setModalOpen } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/src/redux/store";
import { Button } from "@heroui/button";
import ClientLogger from "../general components/client logger/Clo";
import Clo from "../general components/client logger/Clo";

// import ClientLogger from "@/src/components/general components/client logger/ClientLogger"

type Props = {};

export default function TestModal({}: Props) {
  const d = useAppDispatch();
  return (
    <div>
      <Button
        onPress={() => {
          d(
            setModalOpen({
              type: "ss",
              size: "3xl",
              modalTitle: "hello world",
              payloadData: "sss",
              placement: "top",
              isDraggable: true,
              backdrop: "blur",
              isDismissable: false,
            })
          );
        }}
      >
        open root modal
      </Button>
    </div>
  );
}
