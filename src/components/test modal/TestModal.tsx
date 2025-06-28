'use client'

import { setModalOpen } from "@/src/redux/features/modal/modalSlice"
import { useAppDispatch } from "@/src/redux/store"
import { Button } from "@heroui/button"

type Props = {}


export default function TestModal({}: Props) {
    const d = useAppDispatch()
  return (
    <div>


        <Button
        onPress={()=>{
            d(setModalOpen({type:'ss' ,size:'3xl',payloadData:'sss', isDraggable:true}))
        }}
        
        >open root modal</Button>

    </div>
  )
}



