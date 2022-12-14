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

export const createElement = (options: {
   element: string;
   attributes?: {
      name: string;
      value?: string;
   }[];
   textContext?: string;
}) => {
   const element = document.createElement(options.element);

   options?.attributes &&
      options.attributes.forEach((attribute) => element.setAttribute(attribute.name, attribute?.value || ''));

   if (options?.textContext) element.textContent = options.textContext;

   document.head.appendChild(element);
};

export const title = (text: string) => {
   const current = s('head title');

   // If already exists
   if (current) {
      current.textContent = text;
      return;
   }

   createElement({ element: 'title', textContext: text });
};

export const favicon = (importedIcon: string) => {
   const current = s('head link[rel="icon"]') as HTMLLinkElement;
   const type = mimes[importedIcon?.split('.')?.pop()?.toLowerCase() as keyof typeof mimes];

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

export const faviconBase64 = (base64: string) => {
   const current = s('head link[rel="icon"]') as HTMLLinkElement;
   const type = mimes[base64?.match(/image\/(.+);/)?.[1]?.toLowerCase() as keyof typeof mimes];

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

export const meta = (name: string, content: string) => {
   const current = s(`head meta[name="${name}"]`) as HTMLMetaElement;

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

export const link = (rel: string, href: string) => {
   const current = s(`head link[rel="${rel}"]`) as HTMLLinkElement;

   // If already exists
   if (current) {
      current.href = href;
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
