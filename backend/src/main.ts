import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('OneAppToRuleThemAll API')
    .setDescription('Documentation for the OneAppToRuleThemAll API')
    .setVersion('0.0.1')
    .build();
  const docsPrefix = 'docs';
  const openapiDocs = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsPrefix, app, openapiDocs);

  await runApp({ app, globalPrefix, docsPrefix, openapiDocs });
}

bootstrap();

const runApp = async ({
  app,
  globalPrefix,
  docsPrefix,
  openapiDocs,
}: {
  app: INestApplication<any>;
  globalPrefix: string;
  docsPrefix: string;
  openapiDocs: ReturnType<typeof SwaggerModule.createDocument>;
}) => {
  const runMode = process.env.RUN_MODE;
  Logger.log(`RUN_MODE: ${runMode}`);
  switch (runMode) {
    case 'generate-docs': {
      const filepath = '../gen/backend/openapi.json';
      const outputPath = path.resolve(__dirname, filepath);
      mkdirSync(path.dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, JSON.stringify(openapiDocs), {
        encoding: 'utf8',
      });
      Logger.log(`OpenAPI schema written to ${outputPath}`);
      await app.close();
      return;
    }
    case 'server':
    default: {
      const port = process.env.PORT || 3000;
      await app.listen(port);
      Logger.log(
        `Application is running on: http://localhost:${port}/${globalPrefix}
        Docs are at http://localhost:${port}/${docsPrefix}
        OpenApi schemas are at http://localhost:${port}/${docsPrefix}-json and http://localhost:${port}/${docsPrefix}-yaml`
      );
    }
  }
};
