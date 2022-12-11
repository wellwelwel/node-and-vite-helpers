<h2 align="center">Helpers to Node and Vite</h2>
<p align="center">🌱 A <b>personal</b> compilation with helpers for NodeJS and Vite</p>

### Install

```shell
   npm i node-and-vite-helpers
```

<hr />

### 💡 Helpers

-  #### [selectors](./src/helpers/selectors.js)

   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { s, sAll, sEl, sElAll } from 'node-and-vite-helpers';

   s('#id'); // document.querySelector('#id');
   sAll('.class'); // document.querySelectorAll('.class');
   sEl(element, '.child'); // element.querySelector('.child');
   sElAll(element, '.childs'); // element.querySelectorAll('.childs');
   ```

   </details>

-  #### [setTime](./src/helpers/setTime.js)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { setTime } from 'node-and-vite-helpers';

   setTime(1000); // 1000
   setTime('1000'); // 1000

   setTime('1s'); // 1000
   setTime('1m'); // 60000
   setTime('1h'); // 3600000
   setTime('1d'); // 86400000
   ```

   </details>

-  #### [doClass](./src/helpers/doClass.js)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { cx } from 'node-and-vite-helpers';

   cx(validCondition && 'active', 'class1 class2', invalidCondition && 'hide');
   // 'active class1 class2'
   ```

   </details>

-  #### [tokenGenerate](./src/helpers/tokenGenerate.js)

   > <img src="./.github/assets/readme/nodejs.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { tokenGenerate } from 'node-and-vite-helpers';

   tokenGenerate(8); // '45832c3f', 'fa3fe988', '749ecfaa', ...
   ```

   </details>

-  #### [head](./src/helpers/head.js)

   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { head } from 'node-and-vite-helpers';
   import favicon from '../favicon.svg';

   /**
    * These functions check if an element already exists in head
    * If exists, update element atribute, otherwise creates the element in head
    **/
   head.title('Home');
   head.meta('theme-color', '#6c46bf');
   head.link('canonical', 'https://site.com/');
   head.favicon(favicon);
   head.faviconBase64('data:image/png;base64,iVBO0KGN...ErkJg==');

   /**
    * This function creates any custom element in head
    * Interesting to use for advanced properties, SEO, etc.
    * @param {array} attributes is optional
    * @param {string} textContent is optional
    **/

   const gtag = 'XXXXXXXXXX';

   head.createElement({
      element: 'script',
      attributes: [
         {
            name: 'src',
            value: `https://www.googletagmanager.com/gtag/js?id=G-${gtag}`,
         },
         {
            name: 'async',
         },
      ],
   });

   head.createElement({
      element: 'script',
      textContext: `
         window.dataLayer = window.dataLayer || []
         function gtag() {
            dataLayer.push(arguments)
         }
         gtag('js', new Date())
         gtag('config', 'G-${gtag}')
      `,
   });
   ```

   </details>

<hr />

### Credits

| Contributors | GitHub                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Author       | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |
