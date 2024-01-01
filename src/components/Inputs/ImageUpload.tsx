/* eslint-disable @next/next/no-img-element */
'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { CameraIcon } from 'lucide-react'

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url)
        },
        [onChange],
    )

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={'pfoyut3r'}
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                           flex
                           flex-col
                           items-center
                           cursor-pointer
                           bg-black
                           p-1
                           rounded-md
                           hover:bg-blue-900
                           w-[120px]
                        "
                    >
                        <img
                            className='
                            w-[168px]
                            h-[128px]
                            rounded-full
                            border-2
                            border-white
                            '
                            src={value || 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'}
                            alt="House"
                        />
                        <div
                            className='flex text-white'
                        >
                            <CameraIcon size={20} />
                            <span className="text-sm font-semibold">
                                Imagem
                            </span>
                        </div>
                    </div>

                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload