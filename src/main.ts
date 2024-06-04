import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {

  const kafkaMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'membread-user-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    })

  await kafkaMicroservice.listen();

  const app = await NestFactory.create(AppModule);

  app.use(session({ secret: 'secret', saveUninitialized: false, resave: false, cookie: { maxAge: 60000 } }))

  app.use(passport.initialize())

  app.use(passport.session())

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); // setup static path for file storage

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
