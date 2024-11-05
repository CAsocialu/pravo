import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import './Zdroj.css';
import Title from "../../components/Title/Title";

export default function Zdroj() {
    useEffect(() => {
        // Set a 3-second delay before redirecting
        const timer = setTimeout(() => {
            document.querySelector("body").innerHTML = `<img id="číčaspí" src="/pravo/číčaspí.png" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 99999;" draggable="false">`
            setTimeout(() => {
                window.location.replace('https://github.com/CAsocialu/pravo');
            }, 500);
        }, 1000);

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, []);

    return (
        <div id="sourceContent">
            <Helmet>
                <title>Zdroj · Asociální Právo</title>
                <meta name="description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta property="og:title" content="Zdroj · Asociální Právo" />
                <meta property="og:description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta property="og:image" content="/pravo/assets/banner.png" />
                <meta property="og:url" content="https://www.ceskastranaasocialu.cz/pravo/source" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Zdroj · Asociální Právo" />
                <meta name="twitter:description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta name="twitter:image" content="/pravo/assets/banner.png" />
            </Helmet>
            <Title>Dejte nám sekundu :3</Title>
            <p>Sisina tvrdě spí, a JavaScript pracuje na tom, aby ste se dostali na náš GitHub.</p>
        </div>
    );
}