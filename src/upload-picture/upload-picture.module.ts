import { UploadPictureController } from './upload-picture.controller'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import { join } from 'path'

const uploadDir = join(process.cwd(), 'uploads_pictures')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + '.png')
    },
})

@Module({
    imports: [MulterModule.register({ storage: storage })],
    controllers: [UploadPictureController],
})
export class UploadPictureModule {}
