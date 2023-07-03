import { registerEnumType } from '@nestjs/graphql';
/**
 * UploadType Enum
 */
export enum UploadTypeEnum {
  image = 'image',
  video = 'video',
  audio = 'audio',
  document = 'document',
}

registerEnumType(UploadTypeEnum, {
  name: 'UploadType',
});
