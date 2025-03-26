import { createElement } from "./util";

import "./login.less";

export default class Login {
    element;
    constructor(options) {
        this.options = {
            onSuccess: options.onSuccess || function () { },
            onClose: options.onClose || function () { },
        }

        this._render();
    }

    _handleSubmit(form) {
        const username = form.elements.username.value;
        const password = form.elements.password.value;
        if (username === 'admin' && password === '123456') {
            // 不真的调接口。
            this.options.onSuccess();
            this.hide();
        } else {
            alert('用户名或密码错误');
        }
    }

    _render() {
        this.element = createElement({
            className: "login-wrapper",
            children: [
                createElement({
                    tag: 'div',
                    className: 'login-modal-mask'
                }),
                createElement({
                    tag: 'div',
                    className: 'login-modal',
                    children: [
                        // 模态框头部
                        createElement({
                            tag: 'div',
                            className: 'login-modal-header',
                            children: [
                                createElement({
                                    tag: 'h3',
                                    text: '用户登录'
                                }),
                                createElement({
                                    tag: 'button',
                                    className: 'login-modal-close',
                                    text: '×',
                                    events: {
                                        click: () => this.hide()
                                    }
                                })
                            ]
                        }),

                        // 模态框内容
                        createElement({
                            tag: 'div',
                            className: 'login-modal-content',
                            children: [
                                // 登录表单
                                createElement({
                                    tag: 'form',
                                    className: 'login-form',
                                    events: {
                                        submit: (e) => {
                                            e.preventDefault();
                                            this._handleSubmit(e.target);
                                        }
                                    },
                                    children: [
                                        // 用户名输入框组
                                        createElement({
                                            tag: 'div',
                                            className: 'form-group',
                                            children: [
                                                createElement({
                                                    tag: 'label',
                                                    attrs: { for: 'username' },
                                                    text: '用户名'
                                                }),
                                                createElement({
                                                    tag: 'input',
                                                    attrs: {
                                                        type: 'text',
                                                        id: 'username',
                                                        name: 'username',
                                                        placeholder: '请输入用户名',
                                                        required: 'true'
                                                    }
                                                })
                                            ]
                                        }),

                                        // 密码输入框组
                                        createElement({
                                            tag: 'div',
                                            className: 'form-group',
                                            children: [
                                                createElement({
                                                    tag: 'label',
                                                    attrs: { for: 'password' },
                                                    text: '密码'
                                                }),
                                                createElement({
                                                    tag: 'input',
                                                    attrs: {
                                                        type: 'password',
                                                        id: 'password',
                                                        name: 'password',
                                                        placeholder: '请输入密码',
                                                        required: 'true'
                                                    }
                                                })
                                            ]
                                        }),

                                        // 登录按钮
                                        createElement({
                                            tag: 'button',
                                            attrs: { type: 'submit' },
                                            className: 'login-btn',
                                            text: '登录'
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }


    show() {
        document.body.appendChild(this.element);
    }


    hide() {
        this.element.remove();
        this.options.onClose()
    }
}