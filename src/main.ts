import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { version } from '../package.json';
import { AppModule } from './app.module';
import { BannerGenerator } from './class/banner/banner';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Set the global prefix for all API routes
    app.setGlobalPrefix('api');
    
    // Serve static files from the 'public' directory
    app.use(express.static('public'));
    
    // Parse JSON request bodies with a limit of 50mb
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    
    // Parse URL-encoded request bodies with a limit of 50mb
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    
    // Enable global request payload validation using the ValidationPipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true
    }));
    
    // Enable graceful shutdown of the application
    app.enableShutdownHooks();

    // Define Swagger document options
    const options = new DocumentBuilder().addBearerAuth()
        .setTitle('Shop-Service')
        .setDescription('API description')
        .setVersion(version).build();
    
    // Generate the Swagger document based on the defined options and the Nest.js application instance
    const document = SwaggerModule.createDocument(app, options);
    
    // Set up the Swagger UI endpoint for accessing the generated documentation
    SwaggerModule.setup('/docs', app, document);

    // Start the application and listen on the specified port
    const server = await app.listen(process.env.PORT, () => {
        const banner = new BannerGenerator()
        console.log('--------------------------------------------------------------');
        console.log(banner.generate());
        console.log('--------------------------------------------------------------');
    });
    
    // Set the server timeout to 600,000 milliseconds (10 minutes)
    server.setTimeout(600000);
}

// Call the bootstrap function to start the application
bootstrap();
