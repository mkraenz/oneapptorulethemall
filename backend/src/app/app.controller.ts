import { Controller, Get } from '@nestjs/common';
import { ApiExtension, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

const ApiZuploRoute = (extensionProperties: object) =>
  ApiExtension('x-zuplo-route', extensionProperties);
const ApiZuploInternalDocs = () => ApiExtension('x-internal', true);

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
      options: {},
    },
    policies: {
      inbound: ['set-headers-inbound'],
    },
  })
  @ApiExtension('x-internal', true)
  getData() {
    return this.appService.getData();
  }
}
