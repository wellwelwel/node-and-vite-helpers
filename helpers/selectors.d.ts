/**
 * ✅ Vite | React
 * ❌ Node
 **/
declare function s<K extends keyof HTMLElementTagNameMap>(element: K): HTMLElementTagNameMap[K] | null;
declare function s<K extends keyof SVGElementTagNameMap>(element: K): SVGElementTagNameMap[K] | null;
declare function s<E extends Element = Element>(element: string): E | null;
declare function sEl<K extends keyof HTMLElementTagNameMap>(baseElement: Element, element: K): HTMLElementTagNameMap[K] | null;
declare function sEl<K extends keyof SVGElementTagNameMap>(baseElement: Element, element: K): SVGElementTagNameMap[K] | null;
declare function sEl<E extends Element = Element>(baseElement: E, element: string): E | null;
declare function sAll<K extends keyof HTMLElementTagNameMap>(element: K): NodeListOf<HTMLElementTagNameMap[K]>;
declare function sAll<K extends keyof SVGElementTagNameMap>(element: K): NodeListOf<SVGElementTagNameMap[K]>;
declare function sAll<E extends Element = Element>(element: string): NodeListOf<E>;
declare function sElAll<K extends keyof HTMLElementTagNameMap>(baseElement: Element, element: K): NodeListOf<HTMLElementTagNameMap[K]>;
declare function sElAll<K extends keyof SVGElementTagNameMap>(baseElement: Element, element: K): NodeListOf<SVGElementTagNameMap[K]>;
declare function sElAll<E extends Element = Element>(baseElement: E, element: string): NodeListOf<E>;
export { s, sEl, sAll, sElAll };
