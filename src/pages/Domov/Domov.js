import { Helmet } from "react-helmet-async";
import './Domov.css'
import Title from "../../components/Title/Title";

export default function Domov() {
    return (
        <>
            <Helmet>
                <title>Asociální Právo</title>
                <meta name="description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta property="og:site_name" content="Česká Strana Asociálu" />
                <meta property="og:title" content="Asociální Právo" />
                <meta property="og:description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta property="og:image" content="/pravo/assets/banner.png" />
                <meta property="og:url" content="https://www.ceskastranaasocialu.cz/pravo/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Asociální Právo" />
                <meta name="twitter:description" content="Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak." />
                <meta name="twitter:image" content="/pravo/assets/banner.png" />
            </Helmet>
            <div id="homepageContent">
                <Title>Ve vývoji</Title>
                <span>Ještě tady nic není, ale pracujeme na tom, aby nový web Asociálního Práva byl zprovozněn co nejdříve.</span>
            </div>
        </>
    )
}