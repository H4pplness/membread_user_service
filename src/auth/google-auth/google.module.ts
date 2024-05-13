import { Module } from "@nestjs/common";
import { GoogleController } from "./google.controller";
import { GoogleStrategy } from "./google.strategy";
import { GoogleService } from "./google.service";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "src/modules/user-module/user.module";
import { SessionSerializer } from "./session.serializer";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LocalStrategy } from "../local.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ session: true }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        JwtModule.register({
            secret : process.env.ACCESS_TOKEN_SECRET,
        }),
    ],
    controllers: [GoogleController],
    providers: [GoogleStrategy, GoogleService,SessionSerializer,JwtService]
})
export class GoogleModule {

}