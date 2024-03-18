import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { JoinRequestsDto } from './dto/join.requests.dto'; // 따로 만들어서 가져와야 함.
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './common/dto/user.dto';
import { User } from './common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from './common/interceptor/undefinedToNull.interceptor';

// @UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiResponse( {
        type: UserDto
    })
    @ApiOperation({ summary: '내 정보 조회' })
    // 유저 정보를 불러 오고 싶은데 어떻게 하나요 ? 하지만 최대한 안쓰는게 좋다.
    @Get()
    getUsers(@User() user) { // 이렇게 합니다.
        return user;
    }

    @ApiOperation({ summary: '회원가입' })
    // 회원 가입
    @Post()
    postUsers(@Body() data: JoinRequestsDto) {
        this.usersService.postUsers(data.email, data.nickname, data.password);
    }

    @ApiResponse( {
        status: 200,
        description: "성공",
        type: UserDto
    })
    @ApiOperation({ summary: "로그인" })
    @Post('login')
    logIn(@User() user) {
        return user;
    }

    @ApiOperation({ summary: "로그아웃" })
    @Post('logout')
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie('connet.sid', { httpOnly: true })
        res.send('ok')
    }
}
