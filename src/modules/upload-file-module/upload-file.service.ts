import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UploadCourseAvatarDTO } from "src/dtos/uploadcourseavatar.dto";
import { Repository } from "typeorm";

@Injectable()
export class UploadFileService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async uploadAvatar(userId: string, file: Express.Multer.File) {
        const filePath = `uploads/${file.filename}`;

        try {
            await this.userRepository.update(userId, { avatar: filePath });
        } catch (error) {
            throw new BadRequestException(error);
        }
        return {
            "message": "updated image",
            "image": filePath
        };
    }

    async uploadAvatarOfCourse(userId: string, courseId: number, file: Express.Multer.File) {
        const filePath = `uploads/courses/${file.filename}`;

        var uploadAvatarOfCourse: UploadCourseAvatarDTO = { userId, courseId, filePath };
        return uploadAvatarOfCourse;
    }

}