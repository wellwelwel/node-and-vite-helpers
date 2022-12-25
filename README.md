<h2 align="center">Helpers to Node and Vite</h2>
<p align="center">🌱 A <b>personal</b> compilation with helpers for NodeJS and Vite</p>

### Install

```shell
   npm i node-and-vite-helpers
```

<hr />

### 💡 Helpers

-  #### [selectors](./src/helpers/selectors.ts)

   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

<!-- prettier-ignore -->
   ```js
   import { s, sAll, sEl, sElAll } from 'node-and-vite-helpers';

   s('#id');                     // document.querySelector('#id');
   sAll('.class');               // document.querySelectorAll('.class');
   sEl(element, '.child');       // element.querySelector('.child');
   sElAll(element, '.childs');   // element.querySelectorAll('.childs');
   ```

   </details>

   <hr />

-  #### [setTime](./src/helpers/set-time.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

<!-- prettier-ignore -->
   ```js
   import { setTime } from 'node-and-vite-helpers';

   setTime(1000);    // 1000
   setTime('1000');  // 1000

   setTime('1s');    // 1000
   setTime('1m');    // 60000
   setTime('1h');    // 3600000
   setTime('1d');    // 86400000
   ```

   </details>

   <hr />

-  #### [doClass](./src/helpers/do-class.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { cx } from 'node-and-vite-helpers';

   cx(validCond && 'active', 'class1 class2', invalidCond && 'hide');
   // 'active class1 class2'
   ```

   </details>

-  #### [input](./src/helpers/input.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { striptags, entities, xss } from 'node-and-vite-helpers';

   striptags('<div>🤔...</div>'); // 🤔...

   xss('<div>🤔...</div>'); // &#129300;...
   xss('&lt;div&gt;&#129300;&lt;/div&gt;'); // &#129300;...

   entities.decode('&#129300;...'); // 🤔...

   // I: Trying broke decode xss 😈 //
   (() => {
      const input = '&lt;div&gt;👮&lt;/div&gt;';
      const filteredInput = xss(input);

      entities.decode(filteredInput); // 👮
   })();

   // II: Trying broke decode xss 👿 //
   (() => {
      const input = '&amp;lt;div&amp;gt;👮&amp;lt;/div&amp;gt;';
      const filteredInput = xss(input);

      entities.decode(filteredInput); // 👮
   })();

   // Unsafe
   (() => {
      entities.encode('<div>🤔...</div>');
      // &lt;div&gt;&#129300;...&lt;/div&gt;
      // ❌ Be careful, consider using xss(string)

      entities.decode('&lt;div&gt;🤔.../div&gt;', false);
      // <div>🤔...</div>
      // ❗️ Be careful, consider using entities.decode(string);
   })();
   ```

   👮🏻‍♂️ Use carefully:

   -  The decoding depth of the `xss()` goes up to two stages.
   -  The decoding for display `entities.decode()` has one stage and re-run `striptags` before returning the result.
   -  This means that even if someone insert more layers in an xss attack, it will display the xss content as text and not execute it.

   </details>

   <hr />

-  #### [head](./src/helpers/head.ts)

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

-  #### [tokenGenerate](./src/helpers/token-generate.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

   ```js
   import { tokenGenerate } from 'node-and-vite-helpers';

   tokenGenerate(8); // '45832c3f', 'fa3fe988', '749ecfaa', ...
   ```

   </details>

   <hr />

-  #### [empty](./src/helpers/empty.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

<!-- prettier-ignore -->
   ```js
   import { isEmpty, notEmpty } from 'node-and-vite-helpers';

   isEmpty('');            // true
   isEmpty('   ');         // true
   isEmpty('anything');    // false

   notEmpty('');           // false
   notEmpty('   ');        // false
   notEmpty('anything');   // true
   ```

   </details>

   <hr />

-  #### [forceArray](./src/helpers/force-array.ts)

   > <img src="./.github/assets/readme/nodejs.svg" >
   > <img src="./.github/assets/readme/vite.svg" >
   > <img src="./.github/assets/readme/react.svg" >

   <details open>
   <summary>See an example</summary>

<!-- prettier-ignore -->
   ```js
   import { forceArray } from 'node-and-vite-helpers';

   forceArray('string');         // [ 'string' ]
   forceArray(1);                // [ 1 ]
   forceArray(true);             // [ true ]
   forceArray(false);            // [ false ]
   forceArray({});               // [ {} ]
   forceArray(/* any */);        // [ /* any */ ]

   forceArray([ /* items */ ]);  // [ /* items */ ]
   ```

   </details>

<hr />

### Credits

| Contributors | GitHub                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Author       | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |
