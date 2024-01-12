import { PATH_METADATA } from '@nestjs/common/constants';

const pathSet = new Set();

export function DuplicateRoutePredicate(target: object) {
  const path = Reflect.getMetadata(PATH_METADATA, target);
  if (pathSet.has(path)) {
    throw new Error(`duplicate controller route ${path} was defined`);
  }
  console.log({ path, target });
  pathSet.add(path);
}
