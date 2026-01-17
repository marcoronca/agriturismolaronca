"use client"

import Image from "next/image"
import { SyntheticEvent, useState } from "react"

interface ImageExtProps {
    src: string,
    alt: string,
    width: number | `${number}` | undefined,
    height: number | `${number}` | undefined,
    className: string,
    fallbackUrl: string
}

const ImageExt = ({
    alt,
    className,
    height,
    src,
    width,
    fallbackUrl = "/images/logoRonca.png"
}: ImageExtProps) => {
    const [imgSrc, setImgSrc] = useState(src)
    const [retryCount, setRetryCount] = useState(0)


    const handleError = () => {
        //set default image
        const _fallbackUrl = retryCount > 1 || !fallbackUrl ? "/images/logoRonca.png" : fallbackUrl
        setRetryCount(prev => prev + 1)
        setImgSrc(_fallbackUrl)
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            onError={handleError}
            width={width}
            height={height}
            className={className}
        />
    )
}

export default ImageExt