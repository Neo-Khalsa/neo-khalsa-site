import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Every route is served the same index.html, so without this they all shared
   one <title>. Google then fell back to guessing titles from page content and
   labelled /contact "touch." - the second half of its split heading. */

const ORIGIN = 'https://neokhalsa.com';

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Neo Khalsa',
    description:
      'Neo Khalsa is building Sikh institutions: a book, a publishing imprint, an animated series, and in time an akhara, a university, and a gurdwara.',
  },
  '/mission': {
    title: 'Mission — Neo Khalsa',
    description:
      'What is being built, and why. The Panth does not lack conviction; it lacks the means to act on it.',
  },
  '/projects': {
    title: 'Projects — Neo Khalsa',
    description:
      'A book, a publishing imprint and an animated series — the work already under way, with what each one is for.',
  },
  '/spaces': {
    title: 'Spaces — Neo Khalsa',
    description:
      'An akhara, a university and a gurdwara: the physical institutions, with sites, costs and the order they are attempted in.',
  },
  '/get-involved': {
    title: 'Get Involved — Neo Khalsa',
    description:
      'Where you come in. Funding, skills, premises, legal work and introductions — in public or behind it.',
  },
  '/blueprint': {
    title: 'The Blueprint — Neo Khalsa',
    description:
      'Sixteen pages: the objectives, the costs, and the order in which they are attempted. Readable in full, and downloadable.',
  },
  '/manifesto': {
    title: 'The Khalistan Manifesto — Neo Khalsa',
    description:
      'Ekonkar Singh on Sikh sovereignty, written 2023. Published as a record of thinking, not a statement of present position.',
  },
  '/contact': {
    title: 'Contact — Neo Khalsa',
    description:
      'Enquiries, collaborations, book trade and press for the Neo Khalsa initiative.',
  },
};

function setTag(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = META[pathname] ?? META['/'];
    const url = ORIGIN + (pathname === '/' ? '/' : pathname);

    document.title = m.title;
    setTag('meta[name="description"]', 'content', m.description);

    /* og:* is set too, but note it only helps Google, which renders JS.
       Link-preview crawlers do not, so they keep index.html's static tags. */
    setTag('meta[property="og:title"]', 'content', m.title);
    setTag('meta[property="og:description"]', 'content', m.description);
    setTag('meta[property="og:url"]', 'content', url);
    setTag('meta[name="twitter:title"]', 'content', m.title);
    setTag('meta[name="twitter:description"]', 'content', m.description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [pathname]);

  return null;
}
