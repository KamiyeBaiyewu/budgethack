import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { dataSourceOptions } from './data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
    isGlobal: true,
}),
TypeOrmModule.forFeature([
    User,
]),
TypeOrmModule.forRoot(dataSourceOptions),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
