import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async getHello(): Promise<any> {
    return 'Home';
  }
}
