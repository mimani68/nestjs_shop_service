import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nest'),
		ConfigModule.forRoot({ isGlobal: true }),
		HttpModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
	]
})
export class AppModule {
	constructor() {}
}
