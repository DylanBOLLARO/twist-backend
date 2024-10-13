import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    })
    await app.listen(55000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
