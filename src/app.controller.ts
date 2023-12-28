import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('')
	app(): string {
		return this.appService.app();
	}

	@Get(['/ping', '/healthz', '/readiness', '/liveness'])
	ping(): string {
		return this.appService.ping();
	}

}
