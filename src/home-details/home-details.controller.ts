import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common'
import { HomeDetailsService } from './home-details.service'
import { CreateHomeDetailDto } from './dto/create-home-detail.dto'
import { UpdateHomeDetailDto } from './dto/update-home-detail.dto'
import { Public } from 'src/common/decorators'

@Public()
@Controller('home-details')
export class HomeDetailsController {
    constructor(private readonly homeDetailsService: HomeDetailsService) {}

    @Post()
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

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateHomeDetailDto: UpdateHomeDetailDto,
    // ) {
    //     return this.homeDetailsService.update(+id, updateHomeDetailDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.homeDetailsService.remove(+id)
    // }
}
