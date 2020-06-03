import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'root',
    database: 'desafio',
    entities: [__dirname + '/../entities/*.entity.{js, ts}'],
    synchronize: true,
    logging: 'all',
    logger: 'advanced-console',
};
