import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method;
    switch (method) {
        case 'GET': {
            const { val1, val2 } = req.query;
            try{
                const result = {val1,val2}
                res.status(200).json({ result });
                break;
            }catch(err){
                break;
            }
        }
        case 'POST': {
            try{
                const { val1, val2 } = req.body;
                const result = val1 + val2;
                res.status(200).json({ result });
                break;
            }catch(e){
                break;
            }
        }
        default: {
            res.status(403).end();
        }
    }
}
