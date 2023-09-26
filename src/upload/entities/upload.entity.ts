import { ObjectType } from '@nestjs/graphql';
import { UploadTypeEnum } from 'src/utils/enums/upload_type.enum';

@ObjectType()
export class Upload {
  base_type: UploadTypeEnum;
  updated_at: Date;
  deleted_at?: Date;
  id: number;
  file_size: number;
  is_delete: boolean;
  created_at: Date;
  file_name: string;
  file_type: string;
  aws_key: string;
}
