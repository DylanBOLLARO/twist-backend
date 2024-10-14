import { Injectable } from '@nestjs/common'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { UpdateHomeDetailDto } from './dto/update-home-detail.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class HomeDetailsService {
    constructor(private prisma: PrismaService) {}

    private basicSelect() {
        return {
            id: true,
            slug: true,
            title: true,
            price: true,
            images: true,
        }
    }

    private addHomeDetailsInformationSelect() {
        return {
            ...this.basicSelect(),
            description: true,
            location: true,
            address: true,
            postalCode: true,
            city: true,
            country: true,
            propertyType: true,
            area: true,
            bedrooms: true,
            bathrooms: true,
            garage: true,
            garden: true,
            pool: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    firstname: true,
                    lastname: true,
                    id: true,
                    createdAt: true,
                },
            },
        }
    }

    private composeSelect(addHomeDetailsInformation: any) {
        return {
            ...this.basicSelect(),
            ...(!!addHomeDetailsInformation
                ? this.addHomeDetailsInformationSelect()
                : {}),
        }
    }

    private basicQuery(query: string) {
        return {
            title: {
                contains: query,
                mode: 'insensitive',
            },
        }
    }

    private composeFindByIdOrSlug(idOrSlug: any) {
        return {
            ...(Number.isNaN(parseInt(idOrSlug))
                ? { slug: idOrSlug }
                : { id: +idOrSlug }),
        }
    }

    private composeWhere(query: string) {
        return {
            ...(!!query ? this.basicQuery(query) : {}),
        }
    }

    async create(createHomeDetailDto: any) {
        let HomeDetail =
            await this.prisma.homeDetails.create(createHomeDetailDto)
        HomeDetail.slug = `${HomeDetail.slug}-${HomeDetail?.id}`
        return await this.update(HomeDetail.id, HomeDetail)
    }

    async findAll(params: any) {
        const { number = 20, offset, addHomeDetailsInformation, query } = params

        const composeQuery: any = {
            take: number ? +number : undefined,
            skip: offset ? +offset : undefined,
            select: this.composeSelect(addHomeDetailsInformation),
            where: this.composeWhere(query),
        }

        const results = await this.prisma.homeDetails.findMany(composeQuery)
        const totalResults = await this.prisma.homeDetails.count()

        const composeResult = {
            ...(offset ? { offset } : {}),
            ...(number ? { number } : {}),
            results,
            totalResults,
        }

        return composeResult
    }

    async findOne(idOrSlug: any) {
        const addHomeDetailsInformation = true
        const composeQuery: any = {
            select: this.composeSelect(addHomeDetailsInformation),
            where: this.composeFindByIdOrSlug(idOrSlug),
        }

        return await this.prisma.homeDetails.findUnique(composeQuery)
    }

    async update(id: number, createHomeDetailDto: any) {
        return await this.prisma.homeDetails.update({
            where: {
                id,
            },
            data: createHomeDetailDto,
        })
    }

    // async remove(id: number) {
    //     return await `This action removes a #${id} homeDetail`
    // }
}
