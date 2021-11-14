import React from 'react'

function Header() {
    return (
        <>
            <div className="px-4 py-5 my-1 text-center">
                <h1 style={{color: "purple"}} className ="display-5 fw-bold">The best posts of the <b className="text-decoration-underline">world!</b></h1>
            </div>
            <div className="b-example-divider"></div>
        </>
    )
}
export default Header