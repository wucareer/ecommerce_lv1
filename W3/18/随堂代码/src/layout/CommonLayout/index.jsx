import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header";
import CartSuspend from "../../components/CartSuspend";

export default function CommonLayout() {
    return (
        <div className="common-layout">
            <Header />
            <CartSuspend />
            <Outlet />
        </div>
    )
}