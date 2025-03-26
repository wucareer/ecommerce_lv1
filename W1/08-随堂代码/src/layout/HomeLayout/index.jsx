import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router";
import "./index.css";

export default function HomeLayout() {
    return (
        <div className="home-layout">

            <Header logoType={2} />
            <Outlet />
        </div>

    )
}