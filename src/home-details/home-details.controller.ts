import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UsePipes,
} from '@nestjs/common'
import { HomeDetailsService } from './home-details.service'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { Public } from 'src/common/decorators'
import { CreateHomeDetailsPipe } from './pipes/create.pipe'

@Public()
@Controller('home-details')
export class HomeDetailsController {
    constructor(private readonly homeDetailsService: HomeDetailsService) {}

    @Post()
    @UsePipes(CreateHomeDetailsPipe)
    async create(@Body() createHomeDetailDto: CreateHomeDetailDto) {
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
}
