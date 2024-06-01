import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class LeaderBoardPipe implements PipeTransform {
    readonly allowedPeriods = ['daily', 'week', 'month', 'alltime'];

    transform(value: any) {
        if (!this.allowedPeriods.includes(value)) {
            throw new BadRequestException(`Invalid period value. Allowed values are: ${this.allowedPeriods.join(', ')}`);
        }
        return value;
    }
}
