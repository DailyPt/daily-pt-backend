import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(email: string, uid: string): Promise<UserEntity> {
    try {
      const user: UserEntity = new UserEntity();
      user.email = email;
      user.uid = uid;
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  findUserByUid(uid: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { uid },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  /*
  async updateUserInformation(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (updateUserDto.nickname) user.nickname = updateUserDto.nickname;
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.birth) user.birth = updateUserDto.birth;
    if (updateUserDto.phone) user.contact.phone = updateUserDto.phone;
    if (updateUserDto.github) user.contact.github = updateUserDto.github;
    if (updateUserDto.jungol) user.contact.jungol = updateUserDto.jungol;
    if (updateUserDto.baekjoon) user.contact.baekjoon = updateUserDto.baekjoon;
    if (updateUserDto.kaggle) user.contact.kaggle = updateUserDto.kaggle;

    try {
      await this.contactRepository.save(user.contact);
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }



  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        where: { email },
        relations: ['contact'],
      });
      if (!user) {
        throw new HttpException(
          `${email} : 없는 이메일 입니다.`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  async checkValidationOfNickname(nickname: string): Promise<boolean> {
    return !(await this.userRepository.findOneBy({ nickname }));
  }
  */
}
