import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router";
import "./index.css";
import CartSuspend from "../../components/CartSuspend";

export default function HomeLayout() {
    return (
        <div className="home-layout">
            <CartSuspend />
            <Header logoType={2} />
            <Outlet />
        </div>

    )
}