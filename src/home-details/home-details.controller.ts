import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    Patch,
    UseGuards,
} from '@nestjs/common'
import { HomeDetailsService } from './home-details.service'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { GetCurrentUserId, Public } from 'src/common/decorators'
import { CreateHomeDetailsPipe, UpdateHomeDetailsPipe } from './pipes'

@Controller('home-details')
export class HomeDetailsController {
    constructor(private readonly homeDetailsService: HomeDetailsService) {}

    @Post()
    async create(
        @Body(CreateHomeDetailsPipe) createHomeDetailDto: CreateHomeDetailDto,
    ) {
        return await this.homeDetailsService.create(createHomeDetailDto)
    }

    @Public()
    @Get()
    async findAll(@Query() query: any) {
        return await this.homeDetailsService.findAll(query)
    }

    @Public()
    @Get(':idOrSlug')
    findOne(@Param('idOrSlug') idOrSlug: any) {
        return this.homeDetailsService.findOne(idOrSlug)
    }

    @Patch(':idOrSlug')
    update(
        @Param('idOrSlug') idOrSlug: string,
        @Body(UpdateHomeDetailsPipe) updateHomeDetailDto: any,
        @GetCurrentUserId() userId: number,
    ) {
        return this.homeDetailsService.update(
            idOrSlug,
            updateHomeDetailDto,
            userId,
        )
    }
}
