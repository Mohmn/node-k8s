import express, { Request, Response } from 'express';
import { CheckPrimeNoPublisher } from '../publishers/check-primeno-publisher';
import { BadRequestError } from '../errors';
import { rmqWrapper } from '../mq-wrapper';

const router = express.Router();

router.get('/api/isPrime/:number', async (req: Request, res: Response) => {
    const numberToCheck = +req.params.number;
    if (!numberToCheck)
        throw new BadRequestError(`${req.params.number} is not string`)
    console.log('number to check ',numberToCheck);
    const r = await new CheckPrimeNoPublisher(rmqWrapper.client).publishAndWaitForData({
        number: numberToCheck
    })

    console.log('rr',r)
    // todo 
    // create a redis cache 
    // check redis cache first
    // if not in redis
    // emit an emit in raabitmq to check for prime no.
    // return yes no based upon that

    //   const ticket = await Ticket.findById(req.params.id);

    //   if (!ticket) {
    //     throw new NotFoundError();
    //   }

      res.send({d:r});
});

export { router as isPrimeNumberRouter };
