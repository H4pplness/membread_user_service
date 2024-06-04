import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UploadFileService } from "./upload-file.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('upload')
export class UploadFileController {
  constructor(private readonly uploadFileService : UploadFileService){}
  
  @Post('avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  uploadAvatar(@UploadedFile() file: Express.Multer.File,@Req() req) {
    const image = this.uploadFileService.uploadAvatar(req.user.userId,file);
    return image;
  }
}