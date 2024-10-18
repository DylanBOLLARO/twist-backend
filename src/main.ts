import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import * as bodyParser from 'body-parser'
import * as express from 'express'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const uploadDir = join(process.cwd(), 'uploads_pictures')
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir)
    }

    app.useGlobalPipes(new ValidationPipe())
    app.use(
        '/uploads_pictures',
        express.static(join(process.cwd(), 'uploads_pictures')),
    )
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    })
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    await app.listen(55000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
