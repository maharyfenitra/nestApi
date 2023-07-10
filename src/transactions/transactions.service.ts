import { Injectable } from '@nestjs/common';
import { privateKey1, privateKey2, publicKey1, publicKey2 } from './data/temps';
import {
  server,
  newKeyPair,
  getWallet,
  transferToken,
  sendLambor,
  getSolBalance,
  getTokenBalance,
} from './operation';

@Injectable()
export class TransactionsService {
  async swapToken(fromCurrency: string, amount: number, toCurrency: string) {
    try {
      const signature1 = await transferToken(
        fromCurrency,
        privateKey1,
        publicKey2,
        amount,
      );
      const signature2 = await transferToken(
        toCurrency,
        privateKey2,
        publicKey1,
        amount,
      );
      console.log({ s1: signature1, s2: signature2 });
      return { signature1, signature2 };
    } catch (e) {
      return null;
    }
  }

  async getTokenBalance(token: string) {
    const wallet1 = getWallet(privateKey1);
    const sold = await getTokenBalance(wallet1, token);
    return sold;
  }
}
