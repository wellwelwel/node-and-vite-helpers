/**
 * ✅ Vite | React
 * ❌ Node
 **/

function s<K extends keyof HTMLElementTagNameMap>(element: K): HTMLElementTagNameMap[K] | null;
function s<K extends keyof SVGElementTagNameMap>(element: K): SVGElementTagNameMap[K] | null;
function s<E extends Element = Element>(element: string): E | null;
function s<E extends Element>(element: string): E | null {
   return document.querySelector(element);
}

function sEl<K extends keyof HTMLElementTagNameMap>(baseElement: Element, element: K): HTMLElementTagNameMap[K] | null;
function sEl<K extends keyof SVGElementTagNameMap>(baseElement: Element, element: K): SVGElementTagNameMap[K] | null;
function sEl<E extends Element = Element>(baseElement: E, element: string): E | null;
function sEl<E extends Element>(baseElement: E, element: string): E | null {
   return baseElement.querySelector(element);
}

function sAll<K extends keyof HTMLElementTagNameMap>(element: K): NodeListOf<HTMLElementTagNameMap[K]>;
function sAll<K extends keyof SVGElementTagNameMap>(element: K): NodeListOf<SVGElementTagNameMap[K]>;
function sAll<E extends Element = Element>(element: string): NodeListOf<E>;
function sAll<E extends Element>(element: string): NodeListOf<E> {
   return document.querySelectorAll(element);
}

function sElAll<K extends keyof HTMLElementTagNameMap>(
   baseElement: Element,
   element: K
): NodeListOf<HTMLElementTagNameMap[K]>;
function sElAll<K extends keyof SVGElementTagNameMap>(
   baseElement: Element,
   element: K
): NodeListOf<SVGElementTagNameMap[K]>;
function sElAll<E extends Element = Element>(baseElement: E, element: string): NodeListOf<E>;
function sElAll<E extends Element>(baseElement: E, element: string): NodeListOf<E> {
   return baseElement.querySelectorAll(element);
}

export { s, sEl, sAll, sElAll };
