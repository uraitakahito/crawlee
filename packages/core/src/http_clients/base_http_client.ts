import type { Readable } from 'stream';

import type { FormDataLike } from './form_data_like';

type Timeout =
    | {
          lookup: number;
          connect: number;
          secureConnect: number;
          socket: number;
          send: number;
          response: number;
      }
    | { request: number };

type Method =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'HEAD'
    | 'DELETE'
    | 'OPTIONS'
    | 'TRACE'
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'head'
    | 'delete'
    | 'options'
    | 'trace';

export interface ResponseTypes {
    'json': unknown;
    'text': string;
    'buffer': Buffer;
}

interface ToughCookieJar {
    getCookieString: ((
        currentUrl: string,
        options: Record<string, unknown>,
        callback: (error: Error | null, cookies: string) => void,
    ) => void) &
        ((url: string, callback: (error: Error | null, cookieHeader: string) => void) => void);
    setCookie: ((
        cookieOrString: unknown,
        currentUrl: string,
        options: Record<string, unknown>,
        callback: (error: Error | null, cookie: unknown) => void,
    ) => void) &
        ((rawCookie: string, url: string, callback: (error: Error | null, result: unknown) => void) => void);
}

interface PromiseCookieJar {
    getCookieString: (url: string) => Promise<string>;
    setCookie: (rawCookie: string, url: string) => Promise<unknown>;
}

// Omitted (https://github.com/sindresorhus/got/blob/main/documentation/2-options.md):
//  - decompress,
//  - resolveBodyOnly,
//  - allowGetBody,
//  - dnsLookup,
//  - dnsCache,
//  - dnsLookupIpVersion,
//  - retry,
//  - hooks,
//  - parseJson,
//  - stringifyJson,
//  - request,
//  - cache,
//  - cacheOptions,
//  - http2
//  - https
//  - agent
//  - localAddress
//  - createConnection
//  - pagination
//  - setHost
//  - maxHeaderSize
//  - methodRewriting
//  - enableUnixSockets
//  - context
export interface HttpRequest<TResponseType extends keyof ResponseTypes = 'text'> {
    [k: string]: unknown; // TODO BC with got - remove in 4.0

    url: string | URL;
    method?: Method;
    searchParams?: string | URLSearchParams | Record<string, string | number | boolean | null | undefined>;
    signal?: AbortSignal;
    headers?: Record<string, string | string[] | undefined>;
    body?: string | Buffer | Readable | Generator | AsyncGenerator | FormDataLike;
    form?: Record<string, string>;
    json?: unknown;

    username?: string;
    password?: string;

    cookieJar?: ToughCookieJar | PromiseCookieJar;
    followRedirect?: boolean | ((response: any) => boolean); // TODO BC with got - specify type better in 4.0
    maxRedirects?: number;

    timeout?: Partial<Timeout>;

    encoding?: BufferEncoding;
    responseType?: TResponseType;
    throwHttpErrors?: boolean;

    // from got-scraping Context
    proxyUrl?: string;
    headerGeneratorOptions?: Record<string, unknown>;
    useHeaderGenerator?: boolean;
    headerGenerator?: {
        getHeaders: (options: Record<string, unknown>) => Record<string, string>;
    };
    insecureHTTPParser?: boolean;
    sessionToken?: object;
}

export interface HttpResponse<TResponseType extends keyof ResponseTypes = keyof ResponseTypes> {
    [k: string]: any; // TODO BC with got - remove in 4.0

    request: HttpRequest<TResponseType>;

    redirectUrls: URL[];
    url: string;

    ip?: string;
    statusCode: number;

    body: ResponseTypes[TResponseType];
}

export abstract class BaseHttpClient {
    abstract sendRequest<TResponseType extends keyof ResponseTypes = 'text'>(
        request: HttpRequest<TResponseType>,
    ): Promise<HttpResponse<TResponseType>>;
}
