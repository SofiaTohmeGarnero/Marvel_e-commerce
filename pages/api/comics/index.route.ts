import type { NextApiRequest, NextApiResponse } from 'next';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

const handler = async(req: NextApiRequest, res: NextApiResponse) =>{
    if( req.method != 'GET'){
        res.status(405).json({error: 'method not supported'});
        return;
    }
    
    const { offset, limit } = req.query;
    const response = await getComics(parseInt(offset as string), parseInt(limit as string));

    return await res.status(200).json(response.data.results);
} 

export default handler;