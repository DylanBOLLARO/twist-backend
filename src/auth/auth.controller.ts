import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common'

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators'
import { RtGuard } from '../common/guards'
import { AuthService } from './auth.service'
import { Tokens } from './types'
import { AuthSigninDto, AuthSignupDto } from './dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(
        @Body() dto: AuthSignupDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Tokens> {
        return this.authService.signupLocal(dto)
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(
        @Body() dto: AuthSigninDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Tokens> {
        return this.authService.signinLocal(dto)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId)
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    getMyProfile(@GetCurrentUserId() userId: number): Promise<any> {
        return this.authService.getMyProfile(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken)
    }
}
