import { useEffect, useLayoutEffect, useContext, useRef } from 'react';
import "./Header.css"
import Logo from '../../images/logo-white.png'
import { Link, useLocation } from 'react-router-dom';
import { CelebrationContext } from '../../App';

export default function Header() {
    const location = useLocation(),
        celebrationStatus = useContext(CelebrationContext),
        headerMenuTriggerRef = useRef(null),
        headerLinksRef = useRef(null);
    
    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-location', ("/pravo" + location.pathname).replace(/(?<!^)\/$/, ''));
        
        headerLinksRef.current?.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href') === document.documentElement.getAttribute('data-location')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
          });
    }, [location]);

    useEffect(() => {
        function handleClickOutside(e) {
            const contentDiv = e.target.localName === 'div' && e.target.id === 'content';

            if (headerMenuTriggerRef.current.checked && contentDiv) {
                headerMenuTriggerRef.current.checked = false;
            }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div id="header" className={celebrationStatus.aceCelebration ? 'ace' : ''}>
            <span>
                <span>Asociální Právo {process.env.NODE_ENV === "development" ? <img src={Logo} alt='Logo ČSA' /> : <a href='/' rel='noreferrer' target='_blank'><img src={Logo} alt='Logo ČSA' /></a>}</span>
                <input type="checkbox" id="headerMenuTrigger" ref={headerMenuTriggerRef} />
                <label className='material-symbols-outlined' htmlFor="headerMenuTrigger">menu</label>
            </span>
            <div id="headerLinks" ref={headerLinksRef}>
                <Link to="/" onClick={() => headerMenuTriggerRef.current.checked = false}>Hlavní Stránka</Link>
            </div>
        </div>
    )
}