
import { useRef, useState, useEffect } from "react";
export default function useAppear(params) {
    const { once, Threshold, rootMargin } = params
    const ref = useRef(null);
    const [isAppear, setIsAppear] = useState(false);

    // 关键Api  IntersectionObserver

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                // isIntersecting  表示元素是否可见
                if (entry.isIntersecting) {
                    setIsAppear(true)
                    if (once) {
                        observer.disconnect()
                    }
                } else if (!once) {
                    setIsAppear(false)
                }
            })

        }, {
            Threshold,
            rootMargin
        })


        if (ref.current) {
            observer.observe(ref.current)
        }


        return () => {
            observer.disconnect()
        }

    }, [once, Threshold, rootMargin])





    return [ref, isAppear]
}