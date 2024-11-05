const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');

const description = "Asociální Právo je oficiální zpravodajský web České Strany Asociálů. S pečlivou nedbalostí vám přinášíme informace, které nepotřebujete, ale stejně vás pobaví. Pokud se vám zdá, že současný svět má smysl, rádi vám dokážeme opak.";

const routes = [
    {
        path: '/pravo',
        title: 'Asociální Právo',
        canonical: 'https://www.ceskastranaasocialu.cz/pravo'
    }
];

async function prerender() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const route of routes) {
        const fileName = route.path === '/pravo' ? 'index.html' : `${route.path.slice(1)}/index.html`;
        const filePath = path.join(__dirname, 'build', fileName);

        // Create directory if it doesn't exist
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });

        // Load the page
        const fullUrl = `file://${path.join(__dirname, 'build', 'index.html')}`;
        await page.goto(fullUrl);
        await page.waitForSelector('#root');

        // Inject meta tags
        await page.evaluate(({ title, description, canonical }) => {
            // Set title
            document.title = title;

            // Set description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = description;

            // Set Open Graph meta tags
            const ogTags = {
                'og:title': title,
                'og:description': description,
                'og:image': '/pravo/assets/banner.png',
                'og:url': canonical,
                'og:type': 'website'
            };

            for (const [property, content] of Object.entries(ogTags)) {
                let ogTag = document.querySelector(`meta[property="${property}"]`);
                if (!ogTag) {
                    ogTag = document.createElement('meta');
                    ogTag.setAttribute('property', property);
                    document.head.appendChild(ogTag);
                }
                ogTag.content = content;
            }

            // Set Twitter meta tags
            const TwitterTags = {
                'twitter:title': title,
                'twitter:description': description,
                'twitter:image': 'https://ceskastranaasocialu.cz/pravo/assets/banner.png',
                'twitter:site': '@CASocialu',
                'twitter:card': 'summary_large_image'
            };

            for (const [property, content] of Object.entries(TwitterTags)) {
                let twitterTag = document.querySelector(`meta[name="${property}"]`);
                if (!twitterTag) {
                    twitterTag = document.createElement('meta');
                    twitterTag.setAttribute('name', property);
                    document.head.appendChild(twitterTag);
                }
                twitterTag.content = content;
            }

            // Set theme-color meta tag
            let themeColorMeta = document.querySelector('meta[name="theme-color"]');
            if (!themeColorMeta) {
                themeColorMeta = document.createElement('meta');
                themeColorMeta.name = 'theme-color';
                document.head.appendChild(themeColorMeta);
            }
            themeColorMeta.content = '#009074';

            // Set canonical URL
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.rel = 'canonical';
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.href = canonical;

            // Set robots meta tag
            let robots = document.querySelector('meta[name="robots"]');
            if (!robots) {
                robots = document.createElement('meta');
                robots.name = 'robots';
                document.head.appendChild(robots);
            }
            robots.content = 'index, follow';

            // Apply stylesheet link
            let stylesheetLink = document.querySelector('link[href="/index.css"]');
            if (!stylesheetLink) {
                stylesheetLink = document.createElement('link');
                stylesheetLink.rel = 'stylesheet';
                stylesheetLink.href = '/pravo/index.css';
                document.head.appendChild(stylesheetLink);
            }

            document.documentElement.setAttribute('data-location',  new URL(canonical).pathname.replace(/(?<!^)\/$/, ''));
        }, { ...route, description });

        const html = await page.content();
        await fs.writeFile(filePath, html);
    }

    // Generate sitemap.xml
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${route.canonical}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

    await fs.writeFile(path.join(__dirname, 'build', 'sitemap.xml'), sitemapContent);

    await browser.close();
}

prerender().catch(console.error);