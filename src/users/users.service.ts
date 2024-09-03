import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/entities/user.entity';
import { Between, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHelper } from 'src/helpers/response.helper';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,){
      
    }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new InternalServerErrorException("User exists already")
    }

    let userCreate = this.userRepository.create(createUserDto)
    await this.userRepository.save(userCreate)

    return userCreate;
  }



  async findAll(userFilterDto: UserFilterDto,res: any,) {
    let {
      userId,
      firstName,
      lastName,
      email,
      limit,
      page,
      startDate,
      endDate
    } = userFilterDto;
    let { searchBy } = userFilterDto;
    limit = limit ? limit : 10;
    page = page && page > 0 ? page : 1;
    const skip = (page - 1) * limit;
    const baseCondition: any = {};


    if (userId) {
      baseCondition.userId = userId;
    }
    if (firstName) {
      baseCondition.firstName = firstName;
    }
    if (lastName) {
      baseCondition.lastName = lastName;
    }
    if (email) {
      baseCondition.email = email;
    }
    if (startDate && endDate) {
      const adjustedstartDate = new Date(startDate);
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);
      baseCondition.createdAt = Between(
          adjustedstartDate.toISOString(),
          adjustedEndDate.toISOString(),
      );
  }


  const userSearchConditions: any[] = [];
  if (searchBy) {
      const searchTerms = searchBy
          .split(' ')
          .filter((term) => term.trim());

      if (searchTerms.length === 1) {
          // Single term search
          const searchTerm = searchTerms[0];
          userSearchConditions.push(
              { firstName: ILike(`%${searchTerm}%`) },
              { lastName: ILike(`%${searchTerm}%`) },
              { otherName: ILike(`%${searchTerm}%`) },
              { email: ILike(`%${searchTerm}%`) },
          );
      } else if (searchTerms.length === 2) {
          // Full name search (e.g., "John Doe")
          const [firstName, lastName] = searchTerms;
          userSearchConditions.push(
              {
                  firstName: ILike(`%${firstName}%`),
                  lastName: ILike(`%${lastName}%`),
              },
              {
                  firstName: ILike(`%${lastName}%`),
                  lastName: ILike(`%${firstName}%`),
              }, // To handle "Doe John"
          );
      }
  }

    const whereConditions =
      userSearchConditions.length > 0
        ? [
          ...userSearchConditions.map((condition) => ({
            ...baseCondition,
            ...condition,
          })),
        ]
        : baseCondition;

    const [result, totalCount] = await this.userRepository.findAndCount({
      where: whereConditions,
    })
    const hasNextPage = skip + limit < totalCount;
    const hasPreviousPage = skip > 0;


    return res.json({
      result,
      total: totalCount,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
  });
  }



  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new InternalServerErrorException("User does not exist")
    }
    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, email } = updateUserDto; // Correct destructuring
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new InternalServerErrorException("User does not exist")
    }
  
    if(firstName)user.firstName= firstName;

    if(lastName)user.lastName= lastName;
    
    if(email)user.email= email;

    await this.userRepository.save(user)

    return user;

  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new InternalServerErrorException("User does not exist")
    }
    await this.userRepository.delete(user)
    return 'User Deleted Successfully';
  }
}
