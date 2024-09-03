import { Controller, Get, Post, Body, Patch, Param, Delete, Res, InternalServerErrorException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { ResponseHelper } from 'src/helpers/response.helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      
      const data =await this.usersService.create(createUserDto);
      return ResponseHelper.successResponse("User created Successfully",data)

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('findall')
  async findAll(@Query() userFilterDto: UserFilterDto, @Res() res: Response,) {
    try {
      const data = await this.usersService.findAll(userFilterDto, res);
      return ResponseHelper.successResponse(
        'User Filtered successfully',
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data= await this.usersService.findOne(+id);
      return ResponseHelper.successResponse('User Found successfully',data)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.usersService.update(+id, updateUserDto);
      return ResponseHelper.successResponse('User updated successfully',data)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.usersService.remove(+id);
      return ResponseHelper.successResponse('User Deleted successfully',data)

    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }
}
