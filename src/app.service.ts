import { Injectable, Logger } from '@nestjs/common';
import { ModuleNameEnum } from './utils/enums/modules_names.enum';
import { promises as fsPromises, mkdirSync } from 'fs';

const { writeFile } = fsPromises;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  snakeCaseToCamelCase(input: string): string {
    return input
      .toLowerCase()
      .replaceAll(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async moduleGenerator(moduleNames: ModuleNameEnum[]) {
    for (const moduleName of moduleNames) {
      const moduleDir = `src/${moduleName.replaceAll('_', '-')}`;
      mkdirSync(moduleDir, { recursive: true });

      await this.generateFile(
        `${moduleDir}/${moduleName.replaceAll('_', '-')}.controller.ts`,
        this.generateControllerCode(moduleName),
      );

      await this.generateFile(
        `${moduleDir}/${moduleName.replaceAll('_', '-')}.module.ts`,
        this.generateModuleCode(moduleName),
      );

      await this.generateFile(
        `${moduleDir}/${moduleName.replaceAll('_', '-')}.resolver.ts`,
        this.generateResolverCode(moduleName),
      );

      await this.generateFile(
        `${moduleDir}/${moduleName.replaceAll('_', '-')}.service.ts`,
        this.generateServiceCode(moduleName),
      );

      const dtoDir = `${moduleDir}/dto`;
      mkdirSync(dtoDir, { recursive: true });

      await this.generateFile(
        `${dtoDir}/create-${moduleName.replaceAll('_', '-')}.input.ts`,
        await this.generateCreateInputCode(moduleName),
      );

      await this.generateFile(
        `${dtoDir}/update-${moduleName.replaceAll('_', '-')}.input.ts`,
        this.generateUpdateInputCode(moduleName),
      );

      const entitiesDir = `${moduleDir}/entities`;
      mkdirSync(entitiesDir);

      await this.generateFile(
        `${entitiesDir}/${moduleName.replaceAll('_', '-')}.entity.ts`,
        await this.generateEntityCode(moduleName),
      );
    }
  }

  private generateFile(filePath: string, content: string) {
    return writeFile(filePath, content);
  }

  private generateControllerCode(moduleName: string) {
    const capitalCamelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );

    const camelCase = this.snakeCaseToCamelCase(moduleName);

    return `
import { ${capitalCamelCase}Service } from './${moduleName.replaceAll(
      '_',
      '-',
    )}.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { filterConverter } from '../utils/helpers/parser.helper';
import { Create${capitalCamelCase}Input } from './dto/create-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { Update${capitalCamelCase}Input } from './dto/update-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { ${capitalCamelCase} } from './entities/${moduleName.replaceAll(
      '_',
      '-',
    )}.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('${this.capitalizeFirstLetter(moduleName.replaceAll('_', ' '))}')
@Controller('${moduleName.replaceAll('_', '-')}')
export class ${capitalCamelCase}Controller {
  constructor(
    private readonly ${camelCase}Service: ${capitalCamelCase}Service,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - ${capitalCamelCase} Controller',
    description: 'create ${this.capitalizeFirstLetter(
      moduleName.replaceAll('_', ' '),
    )}',
  })
  @ApiCreatedResponse({ type: ${capitalCamelCase} })
  async create(@Body() create${capitalCamelCase}Input: Create${capitalCamelCase}Input) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.create(create${capitalCamelCase}Input, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - ${capitalCamelCase} Controller',
    description: 'update ${this.capitalizeFirstLetter(
      moduleName.replaceAll('_', ' '),
    )}',
  })
  @ApiCreatedResponse({ type: ${capitalCamelCase} })
  async update(
    @Param('id') id: number,
    @Body() update${capitalCamelCase}Input: Update${capitalCamelCase}Input,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.update(+id, update${capitalCamelCase}Input, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - ${capitalCamelCase} Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: ${capitalCamelCase} })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - ${capitalCamelCase} Controller',
    description: 'find ${this.capitalizeFirstLetter(
      moduleName.replaceAll('_', ' '),
    )} by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - ${capitalCamelCase} Controller',
    description: 'Find all ${moduleName.replaceAll(
      '_',
      ' ',
    )} or find ${this.capitalizeFirstLetter(
      moduleName.replaceAll('_', ' '),
    )} by filter and search',
  })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: '{"field":"value"}',
  })
  @ApiQuery({ name: 'filter', type: 'object', required: false })
  @ApiCreatedResponse({ type: [${capitalCamelCase}] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.${moduleName}WhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const ${camelCase} = await this.${camelCase}Service.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', \`\${${camelCase}.length}\`);

          return ${camelCase};
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}

    `;
  }

  private generateModuleCode(moduleName: string) {
    const camelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );
    return `
import { Module } from '@nestjs/common';
import { ${camelCase}Service } from './${moduleName.replaceAll(
      '_',
      '-',
    )}.service';
import { ${camelCase}Resolver } from './${moduleName.replaceAll(
      '_',
      '-',
    )}.resolver';
import { PrismaService } from '../prisma.service';
import { ${camelCase}Controller } from './${moduleName.replaceAll(
      '_',
      '-',
    )}.controller';

@Module({
  providers: [${camelCase}Resolver, ${camelCase}Service, PrismaService],
  controllers: [${camelCase}Controller],
})
export class ${camelCase}Module {}
`;
  }

  private generateResolverCode(moduleName: string) {
    const capitalCamelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );

    const camelCase = this.snakeCaseToCamelCase(moduleName);

    return `
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ${capitalCamelCase}Service } from './${moduleName.replaceAll(
      '_',
      '-',
    )}.service';
import { ${capitalCamelCase} } from './entities/${moduleName.replaceAll(
      '_',
      '-',
    )}.entity';
import { Create${capitalCamelCase}Input, Filter${capitalCamelCase}Input } from './dto/create-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { Update${capitalCamelCase}Input } from './dto/update-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => ${capitalCamelCase})
export class ${capitalCamelCase}Resolver {
  constructor(
    private readonly ${camelCase}Service: ${capitalCamelCase}Service,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => ${capitalCamelCase})
  async create${capitalCamelCase}(@Args('create${capitalCamelCase}Input') create${capitalCamelCase}Input: Create${capitalCamelCase}Input) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.create(create${capitalCamelCase}Input, prisma);
      },
    );
  }

  @Query(() => [${capitalCamelCase}])
  ${camelCase}s(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: Filter${capitalCamelCase}Input,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.findAll(prisma, page, pageSize, filter, search);
      },
    );
  }

  @Query(() => ${capitalCamelCase}, { name: '${camelCase}' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => ${capitalCamelCase})
  async update${capitalCamelCase}(@Args('update${capitalCamelCase}Input') update${capitalCamelCase}Input: Update${capitalCamelCase}Input) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.update(
          update${capitalCamelCase}Input.id,
          update${capitalCamelCase}Input,
          prisma,
        );
      },
    );
  }

  @Mutation(() => ${capitalCamelCase})
  async remove${capitalCamelCase}(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.${camelCase}Service.remove(id, prisma);
      },
    );
  }
}

    `;
  }

  private generateServiceCode(moduleName: string) {
    const capitalCamelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );

    const camelCase = this.snakeCaseToCamelCase(moduleName);

    return `
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Create${capitalCamelCase}Input } from './dto/create-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { Update${capitalCamelCase}Input } from './dto/update-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ${capitalCamelCase}Service {
  private logger;
  constructor() {
    this.logger = new Logger('${capitalCamelCase} Service');
  }

  async create(
    create${capitalCamelCase}Input: Create${capitalCamelCase}Input,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const ${camelCase} = await prisma.${moduleName}.create({
        data: {
          ...create${capitalCamelCase}Input,
        },
      });

      return ${camelCase};
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.${moduleName}WhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.${moduleName}WhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const ${camelCase} = await prisma.${moduleName}.findMany({
        where,
        ...(page && {
          ...(page && {
            skip: Number(pageSize) * (page - 1),
            take: Number(pageSize),
          }),
        }),
        orderBy: {
          id: 'desc',
        },
      });

      return ${camelCase};
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const ${camelCase} = await prisma.${moduleName}.findFirst({
        where: {
          id,
        },
      });

      return ${camelCase};
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    update${capitalCamelCase}Input: Update${capitalCamelCase}Input,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const ${camelCase} = await prisma.${moduleName}.update({
        where: {
          id,
        },
        data: {
          ...update${capitalCamelCase}Input,
        },
      });

      return ${camelCase};
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const ${camelCase} = await prisma.${moduleName}.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return ${camelCase};
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
    `;
  }

  async generateCreateInputCode(moduleName: string) {
    return this.generateInputFromSchema(moduleName);
  }

  private generateUpdateInputCode(moduleName: string) {
    const camelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );
    return `
import { IsInt } from 'class-validator';
import { Create${camelCase}Input } from './create-${moduleName.replaceAll(
      '_',
      '-',
    )}.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class Update${camelCase}Input extends PartialType(Create${camelCase}Input) {
  @IsInt()
  id: number;
}
  `;
  }

  async generateEntityCode(moduleName: string) {
    const entityCode = await this.generateEntityFromSchema(moduleName);

    return entityCode;
  }

  async generateEntityFromSchema(moduleName: string) {
    const camelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any =
      await prisma.$queryRaw`SELECT column_name, data_type, is_nullable FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ${moduleName}`;

    if (!schema || schema.length === 0) {
      Logger.error(`Table ${moduleName} not found in the database.`);
      return;
    }

    const imports = [
      "import { ObjectType } from '@nestjs/graphql';",
      '',
      '@ObjectType()',
    ];

    const classDefinition = `export class ${camelCase} {`;

    const properties = schema.map((field) => {
      const isOptional = field.is_nullable === 'YES' ? '?' : '';
      return `  ${
        field.column_name
      }${isOptional}: ${this.mapPrismaTypeToGraphQLType(field.data_type)};`;
    });
    properties.unshift('');

    const entityCode = imports.concat(classDefinition, ...properties, '}');

    return entityCode.join('\n');
  }

  async generateInputFromSchema(moduleName: string) {
    const camelCase = this.capitalizeFirstLetter(
      this.snakeCaseToCamelCase(moduleName),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any =
      await prisma.$queryRaw`SELECT column_name, data_type, is_nullable FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ${moduleName}`;

    if (!schema || schema.length === 0) {
      Logger.error(`Table ${moduleName} not found in the database.`);
      return;
    }

    const imports = ["import { InputType } from '@nestjs/graphql';"];

    const classDefinition = `export class Create${camelCase}Input {`;
    const importFromValidator = new Set();

    const optionalFields = ['is_deleted', 'created_at', 'updated_at'];

    const properties = schema.map((field) => {
      if (field.column_name !== 'id') {
        const isOptional =
          field.is_nullable === 'YES' || optionalFields.includes(field)
            ? '?'
            : '';

        const fieldType = this.mapPrismaTypeToGraphQLType(field.data_type);

        let decorator = '';
        if (fieldType === 'number') {
          decorator = 'IsNumber';
        } else if (fieldType === 'Date') {
          decorator = 'IsDateString';
        } else if (fieldType === 'string') {
          decorator = 'IsString';
        } else if (fieldType === 'boolean') {
          decorator = 'IsBoolean';
        }

        if (decorator) {
          importFromValidator.add(decorator); // Add decorator to the Set
        }

        return `
        ${decorator ? `@${decorator}()\n` : ''}
        ${field.column_name}${isOptional}: ${fieldType};
      `;
      }
    });

    const filterClassDefinition = `export class Filter${camelCase}Input {`;

    const filterProperties = schema.map((field) => {
      const fieldType = this.mapPrismaTypeToGraphQLType(field.data_type);

      let decorator = '';
      if (fieldType === 'number') {
        decorator = 'IsNumber';
      } else if (fieldType === 'Date') {
        decorator = 'IsDateString';
      } else if (fieldType === 'string') {
        decorator = 'IsString';
      } else if (fieldType === 'boolean') {
        decorator = 'IsBoolean';
      }

      if (decorator) {
        importFromValidator.add(decorator);
      }

      return `
        ${decorator ? `@${decorator}()\n` : ''}
        ${field.column_name}?: ${fieldType};
      `;
    });

    const importStatements = `import { ${Array.from(importFromValidator).map(
      (dec) => dec,
    )} } from 'class-validator';`;

    properties.unshift('');

    const entityCode = imports.concat(
      importStatements,
      '',
      '@InputType()',
      classDefinition,
      ...properties,
      '}',
      '',
      '@InputType()',
      filterClassDefinition,
      ...filterProperties,
      '}',
    );

    return entityCode.join('\n');
  }

  mapPrismaTypeToGraphQLType(prismaType: string): string {
    switch (prismaType) {
      case 'integer':
        return 'number';
      case 'character varying':
      case 'text':
        return 'string';
      case 'boolean':
        return 'boolean';
      case 'timestamp with time zone':
      case 'timestamp without time zone':
        return 'Date';
      default:
        return prismaType;
    }
  }
}
