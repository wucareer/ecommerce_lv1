import { useEffect, useState } from "react";

import "./index.css";
export default function Magnify(props) {
    const { imgRef, size = 'sm', scale = 3 } = props;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false)
    const [scaleSize, setScaleSize] = useState(() => {
        if (size === 'sm') {
            return 300
        } else if (size === 'md') {
            return 460
        } else if (size === 'lg') {
            return 620
        }
    });

    const calcPostion = (e) => {
        const imgOriginal = imgRef.current;

        if (!imgOriginal) {
            return;
        }

        setActive(true)
        // 拿到图片基于document的位置 x,y
        const rect = imgOriginal.getBoundingClientRect();
        const offsetPositon = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
        setPosition(offsetPositon)

    }

    const handleMouseLeave = () => {
        setActive(false)
    }


    useEffect(() => {
        const imgOriginal = imgRef.current;
        if (imgOriginal) {
            imgOriginal.addEventListener("mousemove", calcPostion)
            imgOriginal.addEventListener("mouseleave", handleMouseLeave)
        }


        return () => {
            if (imgOriginal) {
                imgOriginal.removeEventListener("mousemove", calcPostion)
            }
        }
    }, [])


    return (
        <div

            className="magnify-glass"
            style={{
                visibility: active ? "visible" : "hidden",
                width: `${scaleSize}px`,
                height: `${scaleSize}px`,
                backgroundImage: `url(${imgRef.current?.src})`,
                backgroundPosition: `-${position.x * scale - scaleSize / 2}px -${position.y * scale - scaleSize / 2}px`,
                backgroundSize: `${imgRef.current?.width * scale}px ${imgRef.current?.height * scale}px`,
            }}
        />
    )
}
