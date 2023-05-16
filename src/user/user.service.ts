import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
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
        relations: ['profile'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  async updateUserProfile(
    user: UserEntity,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UserEntity> {
    try {
      if (!user.profile) user.profile = new ProfileEntity();

      const today: Date = new Date();
      const birthDate: Date = new Date(
        updateProfileDto.year,
        updateProfileDto.month,
        updateProfileDto.day,
      );
      let age: number = today.getFullYear() - birthDate.getFullYear();
      const m: number = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      user.profile.name = updateProfileDto.name;
      user.profile.age = age;
      user.profile.gender = updateProfileDto.gender;
      user.profile.height = updateProfileDto.height;
      user.profile.weight = updateProfileDto.weight;
      user.profile.bmi =
        updateProfileDto.weight /
        ((updateProfileDto.height / 100) * (updateProfileDto.height / 100));
      user.profile.bmr =
        updateProfileDto.gender === 'male'
          ? 66.5 +
            13.75 * updateProfileDto.weight +
            5.003 * updateProfileDto.height -
            6.75 * age
          : 655.1 +
            9.563 * updateProfileDto.weight +
            1.85 * updateProfileDto.height -
            4.676 * age;

      await this.profileRepository.save(user.profile);
      return this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  /*


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
