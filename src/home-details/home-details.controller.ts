import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    Patch,
} from '@nestjs/common'
import { HomeDetailsService } from './home-details.service'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { Public } from 'src/common/decorators'
import { CreateHomeDetailsPipe, UpdateHomeDetailsPipe } from './pipes'

@Public()
@Controller('home-details')
export class HomeDetailsController {
    constructor(private readonly homeDetailsService: HomeDetailsService) {}

    @Post()
    async create(
        @Body(CreateHomeDetailsPipe) createHomeDetailDto: CreateHomeDetailDto,
    ) {
        return await this.homeDetailsService.create(createHomeDetailDto)
    }

    @Get()
    async findAll(@Query() query: any) {
        return await this.homeDetailsService.findAll(query)
    }

    @Get(':idOrSlug')
    findOne(@Param('idOrSlug') idOrSlug: any) {
        return this.homeDetailsService.findOne(idOrSlug)
    }

    @Patch(':idOrSlug')
    update(
        @Param('idOrSlug') idOrSlug: string,
        @Body(UpdateHomeDetailsPipe) updateHomeDetailDto: any,
    ) {
        return this.homeDetailsService.update(idOrSlug, updateHomeDetailDto)
    }
}
