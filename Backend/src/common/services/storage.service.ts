import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';
import type { UploadFileParams } from '../types/index.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({
  buffer,
  fileName,
  folder = 'maverick',
}: UploadFileParams) {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder,
  });
  return result;
}
