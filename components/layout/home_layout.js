import Head from 'next/head';
import Router from 'next/router';
import React from "react";
import front_header from "../common/front_header";
import footer from "../common/footer";


export default function Home_Layout ({
    children,
    title = 'Home',
}) {

    return (
        <div className="bg-gray-3">

            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
                      rel="stylesheet" />
                <link rel="shortcut icon" type="image/png" href="/fav.png"/>
                <link rel="icon" type="image/png" href="/fav.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Prata&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;900&display=swap" rel="stylesheet"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {front_header(title)}

            {children}

            {footer()}

            <script src="/b5/js/bootstrap.bun.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        </div>
    )
}
