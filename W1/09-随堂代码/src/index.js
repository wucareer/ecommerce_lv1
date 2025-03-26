import './index.less'
import { createElement } from './util';
import Login from './login';
export default class EshopUser {

    _token;
    _params;
    constructor(params) {
        this._params = {
            root: params.root,
            isUI: params.isUI || true,
            onInit: params.onInit || function () { },
            onLogin: params.onLogin || function () { },
            onLogout: params.onLogout || function () { },
            onChange: params.onChange || function () { },
        }
        this._init()

    }



    _init() {
        console.log("EshopUser initialized with params:", this._params);

        const cookieStr = document.cookie || '';
        const cookies = {}
        cookieStr.split(';').forEach(function (cookie) {
            const parts = cookie.split('=');
            cookies[parts[0].trim()] = (parts[1] || '').trim();
        })
        this._token = cookies.token;
        if (this._token) {

            this._renderLoggedUI();
        } else {
            this._renderUnLoggedUI();
        }

        // 执行钩子函数
        this._params.onInit(this);
    }


    _renderLoggedUI() {
        if (this._params.root && this._params.isUI) {
            
        }
    }


    _renderUnLoggedUI() {
        if (this._params.root && this._params.isUI) {
            const userWrapper = createElement({
                className: 'user-wrapper',
                children:[
                    createElement({
                        className: 'user-info',
                        children:[
                            createElement({
                                className:'user-base-info',
                                children:[
                                    createElement({
                                        className:'avatar',
                                        children:[
                                            createElement({
                                                tag: 'img',
                                                attrs: {
                                                    src: 'https://assets.ericengineer.com/i/2025/02/19/npvpq4.png',
                                                }
                                            })
                                        ]
                                    }),
                                    createElement({
                                        className:'name',
                                        text: 'hi~晚上好'
                                    }),
                                    createElement({
                                        className:'sub-title',
                                        text: '注册',
                                        events:{
                                            click:()=>{
                                                console.log('用户注册');
                                                
                                            }
                                        }
                                    })
                                ]
                            }),
                            createElement({
                                className:'tips',
                                children:[
                                    createElement({
                                        className:'title',
                                        text: '登入購物平臺後更多優惠'
                                    }),
                                    createElement({
                                         className:'sub-title',
                                        text: '登入可享，專屬優惠，貼心推薦！'
                                    })
                                ]
                            }),
                            createElement({
                                className:'action',
                                text: '立即登入',
                                events:{
                                    click:()=>{
                                        const login = new Login({
                                            onSuccess:()=>{
                                                console.log('登录成功');
                                                
                                            },
                                            onClose:()=>{
                                                // 关闭登录面板
                                                console.log('用户关闭登录面板');
                                            }
                                        })
                                        // 登录面板唤起
                                         login.show()

                                    }
                                }
                            }),
                        ]
                    })
                ]
            })
            this._params.root.appendChild(userWrapper);

        }
    }
}