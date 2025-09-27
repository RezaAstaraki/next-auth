"use client";

import { setModalClose } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDraggable,
} from "@heroui/react";
import { useEffect, useRef } from "react";
import UpdateProfile from "../../auth_cmp/update_profile/UpdateProfile";
// import LoginForm from "../../auth_cmp/login/LoginForm";

type Props = {};

export default function RootModal({}: Props) {
  const {
    isOpen,
    type,
    isCloseAllowed,
    payloadData,
    size,
    scrollBehavior,
    isDismissable,
    placement,
    backdrop,
    isDraggable,
    modalTitle,
    onclose,
  } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const targetRef = useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  return (
    <>
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onClose={() => {
          if (isCloseAllowed) {
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
        <ModalContent>
          {isDraggable ? (
            <ModalHeader {...moveProps} className="flex flex-col gap-1 items-center justify-center">
              {modalTitle && modalTitle}
            </ModalHeader>
          ) : (
            <ModalHeader className="flex flex-col gap-1 items-center justify-center">
              {modalTitle && modalTitle}
            </ModalHeader>
          )}
          <ModalBody>
            {type === "update_profile" && <UpdateProfile />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
