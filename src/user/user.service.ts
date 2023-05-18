import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ProfileDto } from './dto/profile.dto';
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

  async createUserProfile(
    user: UserEntity,
    profileDto: ProfileDto,
  ): Promise<UserEntity> {
    try {
      user.profile = new ProfileEntity();

      user.profile.name = profileDto.name;
      user.profile.age = this.getAge(profileDto.birth);
      user.profile.gender = profileDto.gender;
      user.profile.height = profileDto.height;
      user.profile.weight = profileDto.weight;
      user.profile.bmi = this.getBmi(profileDto.weight, profileDto.height);
      user.profile.bmr = this.getBmr(
        profileDto.gender,
        profileDto.weight,
        profileDto.height,
        user.profile.age,
      );

      await this.profileRepository.save(user.profile);
      return this.userRepository.save(user);
    } catch (e) {
      console.log(profileDto);
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  async updateUserProfile(
    user: UserEntity,
    profileDto: ProfileDto,
  ): Promise<UserEntity> {
    try {
      user.profile.name = profileDto.name;
      user.profile.age = this.getAge(profileDto.birth);
      user.profile.gender = profileDto.gender;
      user.profile.height = profileDto.height;
      user.profile.weight = profileDto.weight;
      user.profile.bmi = this.getBmi(profileDto.weight, profileDto.height);
      user.profile.bmr = this.getBmr(
        profileDto.gender,
        profileDto.weight,
        profileDto.height,
        user.profile.age,
      );

      await this.profileRepository.save(user.profile);
      return this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  getAge(birth: string): number {
    const [year, month, day] = birth.split('/');
    const today: Date = new Date();
    const birthDate: Date = new Date(Number(year), Number(month), Number(day));
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const m: number = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getBmi(weight: number, height: number): number {
    return weight / ((height / 100) * (height / 100));
  }

  getBmr(gender: string, weight: number, height: number, age: number): number {
    return gender === 'male'
      ? 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
      : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }
}
