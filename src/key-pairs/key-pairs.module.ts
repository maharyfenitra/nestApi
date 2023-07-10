import { Module } from '@nestjs/common';
import { KeyPairsService } from './key-pairs.service';
import { KeyPairsController } from './key-pairs.controller';
import { keyPairsSchema } from './key-pairs.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'KeyPairs', schema: keyPairsSchema }]),
  ],
  providers: [KeyPairsService],
  controllers: [KeyPairsController],
})
export class KeyPairsModule {}
