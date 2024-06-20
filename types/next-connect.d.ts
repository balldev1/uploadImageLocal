// types/next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';

    interface Middleware<Req = NextApiRequest, Res = NextApiResponse> {
        (req: Req, res: Res, next: (err?: any) => void): void;
    }

    interface Options<Req = NextApiRequest, Res = NextApiResponse> {
        onError?: (err: any, req: Req, res: Res, next: (err?: any) => void) => void;
        onNoMatch?: (req: Req, res: Res) => void;
    }

    interface NextConnect<Req = NextApiRequest, Res = NextApiResponse> {
        use(middleware: Middleware<Req, Res>): this;
        use(middleware: (req: Req, res: Res, next: (err?: any) => void) => void): this;
        get(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        post(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        put(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        delete(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        patch(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        options(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        trace(handler: Middleware<Req, Res> | ((req: Req, res: Res) => void)): this;
        handler(req: Req, res: Res): void;
    }

    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
        options?: Options<Req, Res>
    ): NextConnect<Req, Res>;

    export = nextConnect;
}
