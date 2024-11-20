import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ReportingsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Enable global config
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    UsersModule, // Import Users module
    AuthModule,
    ClientsModule,
    ReportingsModule,
  ],
})
export class AppModule {}
