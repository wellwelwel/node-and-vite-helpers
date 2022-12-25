/**
 * ✅ Node | Vite | React
 */
export declare const striptags: (string: string, secure?: boolean) => string;
export declare const entities: {
    decode: (string: string, secure?: boolean) => string;
    encode: (string: string) => string;
};
export declare const xss: (string: string) => string;
