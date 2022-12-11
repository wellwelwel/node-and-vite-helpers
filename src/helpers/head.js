/**
 * ✅ Vite | React
 * ❌ Node
 */

import { s } from './selectors.js';

const mimes = {
   gif: 'image/gif',
   ico: 'image/x-icon',
   icon: 'image/x-icon',
   jpeg: 'image/jpeg',
   jpg: 'image/jpeg',
   png: 'image/png',
   svg: 'image/svg+xml',
   webp: 'image/webp',
};

export const createElement = (options = { element: 'meta', attributes: [], textContext }) => {
   const element = document.createElement(options.element);

   options?.attributes &&
      options.attributes.forEach((attribute) => element.setAttribute(attribute.name, attribute?.value || ''));

   if (options?.textContext) element.textContent = options.textContext;

   document.head.appendChild(element);
};

export const title = (text) => {
   const current = s('head title');

   // If already exists
   if (current) {
      current.textContent = text;
      return;
   }

   createElement({ element: 'title', textContext: text });
};

export const favicon = (importedIcon) => {
   const current = s('head link[rel="icon"]');
   const type = mimes[importedIcon.split('.').pop().toLowerCase()];

   // If already exists
   if (current) {
      current.href = importedIcon;
      current.type = type;
      return;
   }

   createElement({
      element: 'link',
      attributes: [
         {
            name: 'rel',
            value: 'icon',
         },
         {
            name: 'href',
            value: importedIcon,
         },
         {
            name: 'type',
            value: type,
         },
      ],
   });
};

export const faviconBase64 = (base64) => {
   const current = s('head link[rel="icon"]');
   const type = mimes[base64.match(/image\/(.+);/)[1].toLowerCase()];

   // If already exists
   if (current) {
      current.href = base64;
      current.type = type;
      return;
   }

   createElement({
      element: 'link',
      attributes: [
         {
            name: 'rel',
            value: 'icon',
         },
         {
            name: 'href',
            value: base64,
         },
         {
            name: 'type',
            value: type,
         },
      ],
   });
};

export const meta = (name, content) => {
   const current = s(`head meta[name="${name}"]`);

   // If already exists
   if (current) {
      current.content = content;
      return;
   }

   createElement({
      element: 'meta',
      attributes: [
         {
            name: 'name',
            value: name,
         },
         {
            name: 'content',
            value: content,
         },
      ],
   });
};

export const link = (rel, href) => {
   const current = s(`head link[rel="${rel}"]`);

   // If already exists
   if (current) {
      current.href = content;
      return;
   }

   createElement({
      element: 'link',
      attributes: [
         {
            name: 'rel',
            value: rel,
         },
         {
            name: 'href',
            value: href,
         },
      ],
   });
};

const head = { title, favicon, faviconBase64, meta, link, createElement };

export default head;
