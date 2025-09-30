"use client";

import { setModalClose } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import UpdateProfile from "../../auth_cmp/update_profile/UpdateProfile";

type Props = {};

export default function RootModal({}: Props) {
  const {
    isOpen,
    type,
    disallowAClose,
    payloadData,
    size,
    scrollBehavior,
    isDismissable,
    placement,
    backdrop,
    modalTitle,
    onclose,
    className,
  } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        className="overflow-y-hidden"
        isOpen={isOpen}
        onClose={() => {
          if (!disallowAClose) {
            if (onclose) {
              eval(onclose);
            }
            dispatch(setModalClose());
          }
        }}
        scrollBehavior={scrollBehavior}
        size={size}
        isDismissable={isDismissable}
        placement={placement}
        backdrop={backdrop}
      >
        <ModalContent className={className}>
          <ModalHeader className="flex flex-col gap-1 items-center justify-center">
            {modalTitle && modalTitle}
          </ModalHeader>

          <ModalBody className="">
            {type === "update_profile" && <UpdateProfile />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
