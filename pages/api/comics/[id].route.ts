import type { NextApiRequest, NextApiResponse } from 'next';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';

const handler = async(req: NextApiRequest, res: NextApiResponse) =>{
    if( req.method != 'GET'){
        res.status(405).json({error: 'method not supported'});
        return;
    }
    
    const {id} = req.query
    const response = await getComic(parseInt(id as string));

    return await res.status(200).json(response);
} 

export default handler;