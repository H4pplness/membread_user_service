import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordInterface } from './password.impl';

@Injectable()
export class PasswordService implements PasswordInterface{
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Số lượng vòng lặp sử dụng cho quá trình hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("HASHED PASS : ",hashedPassword);
    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}