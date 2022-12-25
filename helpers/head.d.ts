/**
 * ✅ Vite | React
 * ❌ Node
 */
declare const head: {
    title: (text: string) => void;
    favicon: (importedIcon: string) => void;
    faviconBase64: (base64: string) => void;
    meta: (name: string, content: string) => void;
    link: (rel: string, href: string) => void;
    createElement: (options: {
        element: string;
        attributes?: {
            name: string;
            value?: string;
        }[];
        textContext?: string;
    }) => void;
};
export { head };
