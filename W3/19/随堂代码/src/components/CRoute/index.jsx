
import React, { useState } from "react";
const urlMap = {};
export default function CRoute(props) {
    console.log('自个儿的router');

    /**
     * 1、拿到url

2、拿到children

3、解析children，将child 下面的path拿到，和当前的url匹配，匹配上的渲染出去


     */


    // 1、拿到url
    const [url, setUrl] = useState(window.location.pathname);

    // 2、拿到children
    const { children, path: pathName, element, proxy } = props;
    // 3、解析children，将child 下面的path拿到，和当前的url匹配，匹配上的渲染出去

    const parseRoutes = (child, path, ele) => {
        if (child === undefined && path !== undefined) {
            urlMap[path] = ele;
        } else {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    parseRoutes(item.props.children, item.props.path, item.props.element)
                })
            } else {
                // ele有可能是空，所以要判断一下
                urlMap[path] = ele;
                parseRoutes(child.props.children, child.props.path, child.props.element)
            }
        }
    }


    parseRoutes(children, pathName, element)

    const render = () => {
        if (proxy) {
            const result = proxy();
            if (!result) {
                return <div>-----代理页面-----</div>
            }
            if (React.isValidElement(result)||typeof result === 'function') {
                return <div>{result()}</div>
            }
        }
        if (urlMap[url]) {
            return urlMap[url]
        } else {
            return <div>404</div>
        }
    }
    return (
        <div>{render()}</div>
    )
}