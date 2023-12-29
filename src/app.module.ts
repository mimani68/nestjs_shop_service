import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			// Import the ConfigModule
			imports: [ConfigModule], 
			useFactory: async (configService: ConfigService) => ({
				// Get the MongoDB connection URI from the environment variables
			  	uri: configService.get<string>('MONGODB_URI'),
			}),
			// Inject the ConfigService
			inject: [ConfigService],
		  }),
		ProductModule,
		CartModule,
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
	constructor(
		private cfg: ConfigService
	) {
		setTimeout(_=>{
			console.log(`[INFO] environment=${this.cfg.get<string>('NODE_ENV')}`)
			console.log(`[INFO] port=${this.cfg.get<string>('PORT')}`)
		}, 1000)
	}
}
