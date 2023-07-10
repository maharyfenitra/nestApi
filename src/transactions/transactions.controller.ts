import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(readonly transactionService: TransactionsService) {}

  @Get()
  findAll(): string {
    return 'find all';
  }
  @Post('swapToken')
  async swapToken(@Req() request: Request, @Res() response: Response) {
    const res = await this.transactionService.swapToken(
      request.body.fromCurrency,
      request.body.amount,
      request.body.toCurrency,
    );
    if (res) {
      return response.status(200).json({ ...res });
    }
    return response.status(500).json({ status: 500, ...res });
  }
  @Post('getTokenBalance')
  async getTokenBalance(@Req() request: Request, @Res() response: Response) {
    const sold = await this.transactionService.getTokenBalance(
      request.body.token,
    );
    console.log(sold);
    if (sold) {
      return response.status(200).json({ sold });
    }
    return response.status(500).json({});
  }
}
