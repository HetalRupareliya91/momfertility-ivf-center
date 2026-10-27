import { useEffect } from 'react';

const SITE = 'MOMFertility IVF Center';

export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
