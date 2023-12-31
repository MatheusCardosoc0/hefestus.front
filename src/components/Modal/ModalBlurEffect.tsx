interface ModalBlurEffectProps {
  closeModalFunction: () => void
}

const ModalBlurEffect: React.FC<ModalBlurEffectProps> = ({
  closeModalFunction
}) => {
  return (
    <div
      onClick={closeModalFunction}
      className="
          fixed
          w-full
          h-full
          bg-[#00000074]
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          cursor-pointer
        "
    />
  )
}

export default ModalBlurEffect