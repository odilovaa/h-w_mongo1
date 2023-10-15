import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ){}

  async generateToken(admin: AdminDocument){
    const jwtPayload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      return new BadRequestException('passwords is not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const createAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.generateToken(createAdmin);
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      createAdmin.id,
      { hashed_token },
      { new: true },
    );
    return updateAdmin;
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find();
    return admins;
  }

  async findOne(id: string) {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel
    .findByIdAndUpdate(id, updateAdminDto, { new: true })
    .exec();
    if(!existingAdmin) {
      throw new NotFoundException(`Admin #${id} not found`);
    }
    return existingAdmin;
  }

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
