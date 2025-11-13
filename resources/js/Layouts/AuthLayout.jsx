import React from "react";
import imageLogin from "@/Assets/img/login-img.png"

export default function AuthLayout({children}){
    return (
        <>
            <div className="flex h-screen">
                <main className={`grow bg-no-repeat`}
                style={{ backgroundImage: `url(${imageLogin})` }}>
                    {children}
                </main>
            </div>
        </>
    )
}
{/* <main className="grow bg-[url(https://files.123freevectors.com/wp-content/original/177533-dark-grey-background-texture.jpg)] bg-cover"> */}