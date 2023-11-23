'use client'

import { CustomButtonProps } from "@/types"
import Image from "next/image"


const CustomButton = ({title, type, disabled, handleClick, containerStyles}: CustomButtonProps) => {
  return (
    <button 
      type={type}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
      disabled={false}
    >
      <span className={`flex-1`}>
        {title}
      </span>
    </button>
  )
}

export default CustomButton