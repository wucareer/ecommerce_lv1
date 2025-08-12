import React, { useState } from "react";
import './index.css'
import Avatar from "../Avatar";
import imgComment from '../../assets/comment01.png'
export default function Comment() {



    return (
        <div className="comment">
            <div className="avatar">
                <Avatar />
            </div>
            <div className="comment-body">
                <div className="comment-header">s**3</div>
                <div className="comment-content">品质：太好了</div>
                <div className="comment-imgs">
                    <img src={imgComment} alt=""/>   
                    <img src={imgComment} alt=""/>   
                    <img src={imgComment} alt=""/>  
                    <img src={imgComment} alt=""/>  
                </div>
            </div>
        </div>
    )
}