import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyPairsModule } from './key-pairs/key-pairs.module';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    MongooseModule.forRoot(
      'mongodb+srv://mgt:Mofogasy123@cluster0.uqss7.mongodb.net/mgt?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    KeyPairsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
