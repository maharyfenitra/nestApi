import { Controller, Post, Req, Res } from '@nestjs/common';
import { KeyPairsService } from './key-pairs.service';
import { Request, Response } from 'express';

@Controller('key-pairs')
export class KeyPairsController {
  constructor(readonly keyPairsService: KeyPairsService) {}
  @Post('createNewKeyPair')
  async createNewKeyPair(@Req() request: Request, @Res() response: Response) {
    const publicKey = await this.keyPairsService.createNewKeyPairForAnUser(
      request.body.accessToken,
    );

    if (publicKey) {
      return response.status(200).json({ publicKey });
    }
    return response.status(500).json({});
  }
}
