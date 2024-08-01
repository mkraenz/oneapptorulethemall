import { Controller, Get } from '@nestjs/common';
import {
  ApiExtension,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

const ApiZuploRoute = (extensionProperties: object) =>
  ApiExtension('x-zuplo-route', extensionProperties);
const ApiZuploInternalDocs = () => ApiExtension('x-internal', true);

class GetHelloDto {
  @ApiProperty({ description: 'Hello message' })
  hello: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Say hi',
    description: 'This is a simple endpoint that returns a greeting message.',
  })
  @ApiResponse({ type: String, description: 'Greeting message' })
  @ApiExtension('x-zuplo-route', {
    corsPolicy: 'none',
    handler: {
      export: 'urlForwardHandler',
      module: '$import(@zuplo/runtime)',
      options: {
        baseUrl: '${env.BASE_URL}',
      },
    },
    policies: {
      inbound: ['set-headers-inbound', 'rate-limit-inbound'],
    },
  })
  @ApiExtension('x-internal', true)
  getData() {
    return this.appService.getData();
  }

  @Get('hello')
  @ApiOperation({
    summary: 'Say hi',
    description: 'This is a simple endpoint that returns a greeting message.',
  })
  @ApiResponse({ type: GetHelloDto, description: 'Greeting message' })
  @ApiExtension('x-zuplo-route', {
    corsPolicy: 'none',
    handler: {
      export: 'urlForwardHandler',
      module: '$import(@zuplo/runtime)',
      options: {
        baseUrl: '${env.BASE_URL}',
      },
    },
    policies: {
      inbound: ['set-headers-inbound'],
    },
  })
  getHello() {
    return { hello: 'world' };
  }
}
