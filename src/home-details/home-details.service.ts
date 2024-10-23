import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'

@Injectable()
export class HomeDetailsService {
    constructor(private prisma: PrismaService) {}

    private targetHomeDetailsByIdOrSlug(idOrSlug: any) {
        return {
            ...(Number.isNaN(parseInt(idOrSlug))
                ? { slug: idOrSlug }
                : { id: +idOrSlug }),
        }
    }
    private basicSelect() {
        return {
            id: true,
            slug: true,
            title: true,
            price: true,
            images: true,
            typeOfProperty: true,
            typeOfContract: true,
            area: true,
            createdAt: true,
            updatedAt: true,
        }
    }

    private addHomeDetailsInformationSelect() {
        return {
            ...this.basicSelect(),
            description: true,
            address: true,
            postalCode: true,
            city: true,
            country: true,
            bedrooms: true,
            bathrooms: true,
            garage: true,
            garden: true,
            pool: true,
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
            ...this.targetHomeDetailsByIdOrSlug(idOrSlug),
        }
    }

    private composeWhere(params: any) {
        const { typeOfProperty, typeOfContract, query } = params

        return {
            ...(!!query ? this.basicQuery(query) : {}),
            ...(!!typeOfProperty
                ? {
                      typeOfProperty: {
                          equals: typeOfProperty,
                      },
                  }
                : {}),
            ...(!!typeOfContract
                ? {
                      typeOfContract: {
                          equals: typeOfContract,
                      },
                  }
                : {}),
        }
    }

    async create(createHomeDetailDto: any) {
        let HomeDetail: any = await this.prisma.homeDetails.create({
            data: createHomeDetailDto,
        })
        HomeDetail.slug = `${HomeDetail?.slug}-${HomeDetail?.id}`
        return await this.prisma.homeDetails.update({
            where: { id: HomeDetail.id },
            data: HomeDetail,
        })
    }

    async findAll(params: any) {
        const { number = 20, offset, addHomeDetailsInformation } = params

        const composeQuery: any = {
            take: number ? +number : undefined,
            skip: offset ? +offset : undefined,
            select: this.composeSelect(addHomeDetailsInformation),
            where: this.composeWhere(params),
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

    async update(idOrSlug: any, updateTestDto: any, userId: number) {
        const target = this.targetHomeDetailsByIdOrSlug(idOrSlug)

        const { userId: homeDetailsUserId }: any =
            await this.prisma.homeDetails.findUnique({
                where: target,
            })

        if (homeDetailsUserId !== userId) {
            throw new ForbiddenException('You do not have modification rights')
        }

        return await this.prisma.homeDetails.update({
            where: target,
            data: updateTestDto,
        })
    }

    async remove(idOrSlug: any, userId: number) {
        const target = this.targetHomeDetailsByIdOrSlug(idOrSlug)

        const { userId: homeDetailsUserId }: any =
            await this.prisma.homeDetails.findUnique({
                where: target,
            })

        if (homeDetailsUserId !== userId) {
            throw new ForbiddenException('You do not have modification rights')
        }

        return await this.prisma.homeDetails.delete({
            where: target,
        })
    }
}
