import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [AuthModule, CatsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://sttreaks2:easypass' +
      '@cluster0-liq5j.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
})
export class AppModule {}
