import React from "react";
import DevCards from "./DevCards";
import Masonry from "react-masonry-css"


export default function Devs() {
    // const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1
      };
    return (
        <>
            <Masonry width="100%" marginInline="auto" breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column2">
            <DevCards
                    img="../images/shwetabh.png"
                    name="shwetabh niket"
                    caption="frontend captain | 2021B5PS0923P"
                    twitter="https://twitter.com/shwetabhNiket"
                    github="https://github.com/nIMblEt06"
                    linkedin="https://www.linkedin.com/in/niketshwetabh/"
                    spotify="https://open.spotify.com/playlist/6mMuC8FzWIuEflOiTkGAUW?si=d4a6280cc03743da"
                    text="i just wanted to make you laugh :/"
                />
                <DevCards
                    img="../images/aryan.png"
                    name="aryan bakshi"
                    caption="multitasker | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                    A token pair is a pair of tokens that are traded on the platform."
                 />
                <DevCards
                    img="../images/patil.png"
                    name="aditya patil"
                    caption="ninja designer | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify="https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8?si=WQhxVzHjR_KFNbH8I8O6IQ&utm_source=copy-link"
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform."
                />
                <DevCards
                    img="../images/pratham.png"
                    name="pratham arya"
                    caption="one man army | 2020B4A81658P"
                    twitter="https://twitter.com/pentaquark16"
                    github="https://github.com/pentaquark1616"
                    linkedin="https://www.linkedin.com/in/pratham-arya/"
                    spotify="https://open.spotify.com/track/5PQV6JRuE9wSfPS49Zlrx7?si=4c22989f0a9a4f81"
                    text="I gave up my struggle with perfection a long time ago. That is a concept I don't find very interesting anymore. Everyone just wants to look good in the photographs. I think that is where some of the pressure comes from. Be happy. Be yourself, the day is about a lot more."
                />
                <DevCards
                    img="../images/patil.png"
                    name="sarthak arora"
                    caption="ninja designer | 2021A7PS0532P"
                    twitter="https://twitter.com/thysarthak"
                    github="https://github.com/sarthakeash"
                    linkedin="https://linkedin.com/in/sarthak-arora-aa92b9201/"
                    spotify="https://open.spotify.com/track/6xGruZOHLs39ZbVccQTuPZ?si=q8rhu3EcS1G9fpm68_G0zQ"
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform."
                />
                <DevCards
                    img="../images/saksham.png"
                    name="saksham aggarwal"
                    caption="ninja designer | 2020A7PS1508P"
                    twitter="https://twitter.com/saksham_io"
                    github="http://github.com/sakshamdevelops"
                    linkedin="http://linkedin.com/in/sakshamagg27/"
                    spotify="https://open.spotify.com/track/3oVGjguICRU4UVS1ZPwH2D?si=12e226df30b947d7"
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform."
                />
                <DevCards
                    img="../images/patil.png"
                    name="shreya nag"
                    caption="ninja designer | 2021A7PS0532P"
                    twitter="https://twitter.com/ShreyaNag01?t=_IJFL1zQb7DUNABcgtz-Bw&s=09"
                    github=""
                    linkedin="https://www.linkedin.com/in/shreya-nag-573976245"
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform."
                />
                <DevCards
                    img="../images/patil.png"
                    name="harsh singh"
                    caption="backing backend | 2021A7PS0532P"
                    twitter="https://twitter.com/ShreyaNag01?t=_IJFL1zQb7DUNABcgtz-Bw&s=09"
                    github=""
                    linkedin="https://www.linkedin.com/in/shreya-nag-573976245"
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform."
                />
                                
            </Masonry>
        </>
    )
}
