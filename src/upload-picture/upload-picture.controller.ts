import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from 'src/common/decorators'

@Public()
@Controller('upload-picture')
export class UploadPictureController {
    @Post('/uploadImage')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: any) {
        return await file.filename
    }
}
