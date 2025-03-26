import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function CommonLayout() {
    return (
        <div className="common-layout">
            <Header />
            <Outlet />
        </div>
    )
}