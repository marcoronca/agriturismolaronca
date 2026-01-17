"use client"

import { useState, useEffect, useRef } from "react"

interface VideoExtProps {
    src: string
    type?: string
    className?: string
    fallbackUrl: string
    poster?: string
}

const VideoExt = ({
    src,
    type = "video/mp4",
    className = "",
    fallbackUrl,
    poster = "/images/logoRonca.png"
}: VideoExtProps) => {
    const [videoSrc, setVideoSrc] = useState(src)
    const [retryCount, setRetryCount] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleError = () => {
        if (retryCount > 1) {
            return
        }
        setVideoSrc(fallbackUrl)
        setRetryCount(prev => prev + 1);
    }

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.load()
        }
    }, [videoSrc])


    return (
        <video
            ref={videoRef}
            key={videoSrc}
            className={className}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            poster={poster}
            onError={handleError}
        >
            <source src={videoSrc} type={type} />
            Your browser does not support the video tag.
        </video>
    )
}

export default VideoExt
