import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Tasks')
    .setDescription('The tasks API description')
    .setVersion('1.0')
    .build();