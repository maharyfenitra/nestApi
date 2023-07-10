import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeyPairType } from './key-pairs.dto';
import * as jwt from 'jsonwebtoken';
import { newKeyPair } from 'src/transactions/operation';

@Injectable()
export class KeyPairsService {
  constructor(
    @InjectModel('KeyPairs') private readonly keyPairsModel: Model<KeyPairType>,
  ) {}

  async createNewKeyPairForAnUser(accessToken: string) {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const pair = newKeyPair();

    const keyPair = await new this.keyPairsModel({
      userId: user.id,
      publicKey: pair.publicKey.toString(),
      privateKey: [...pair.secretKey],
    }).save();

    if (keyPair) return pair.publicKey.toString();

    return null;
  }
}
