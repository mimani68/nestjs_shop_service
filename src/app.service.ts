import { Injectable } from '@nestjs/common';
import { name, version } from '../package.json';

@Injectable()
export class AppService {

	constructor() {}

	app(): any {
		const app = {
			app: name, 
			version: version,
			time: new Date().toISOString()
		};
		return app;
	}

	ping(): string {
		return 'PONG';
	}

}
