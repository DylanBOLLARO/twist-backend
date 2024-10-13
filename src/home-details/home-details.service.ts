import { Injectable } from '@nestjs/common'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { UpdateHomeDetailDto } from './dto/update-home-detail.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class HomeDetailsService {
    constructor(private prisma: PrismaService) {}

    private composeFindByIdOrSlug(idOrSlug: any) {
        return {
            ...(Number.isNaN(parseInt(idOrSlug))
                ? { slug: idOrSlug }
                : { id: +idOrSlug }),
        }
    }

    async create(createHomeDetailDto: any) {
        return await this.prisma.homeDetails.create({
            data: createHomeDetailDto,
        })
    }

    async findAll() {
        return await this.prisma.homeDetails.findMany()
    }

    async findOne(idOrSlug: any) {
        const composeQuery: any = {
            where: this.composeFindByIdOrSlug(idOrSlug),
        }
        return await this.prisma.homeDetails.findUnique(composeQuery)
    }

    // async update(id: number, updateHomeDetailDto: UpdateHomeDetailDto) {
    //     return await `This action updates a #${id} homeDetail`
    // }

    // async remove(id: number) {
    //     return await `This action removes a #${id} homeDetail`
    // }
}
