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
import LoginForm from "../../auth_cmp/login/LoginForm";

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
  } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setModalClose());
  }, []);

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
          dispatch(setModalClose());
        }}
        scrollBehavior={scrollBehavior}
        size={size}
        isDismissable={isDismissable}
        placement={placement}
        backdrop={backdrop}
      >
        <ModalContent>
          {isDraggable ? (
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              {modalTitle && modalTitle}
            </ModalHeader>
          ) : (
            <ModalHeader className="flex flex-col gap-1">
              {modalTitle && modalTitle}
            </ModalHeader>
          )}
          <ModalBody>{type === "ss" && <LoginForm />}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
