import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
          }), 
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: parseInt(process.env.DB_PORT, 10) || 5433,
            host: process.env.DB_HOST || 'localhost',
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD ||'',
            database: process.env.DB_NAME || 'membread-user-db',
            entities: ['dist/database/entities/*.entity{.ts,.js}'],
            synchronize: true
        }),
    ],
})
export class PostGresModule {

}