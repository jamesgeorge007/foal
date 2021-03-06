// std
import * as fs from 'fs';
import { join } from 'path';

// FoalTS
export { findProjectPath } from './find-project-path';
export { Generator } from './generator';
export { initGitRepo } from './init-git-repo';
export { rmDirAndFilesIfExist } from './rm-dir-and-files-if-exist';
export { mkdirIfDoesNotExist } from './mkdir-if-does-not-exist';
export { TestEnvironment } from './test-environment';
export { getNames } from './get-names';

export function mkdirIfNotExists(path: string) {
  const paths = path.split('/');
  const paths2: string[] = [];
  while (paths.length > 0) {
    paths2.push(paths.shift() as string);
    if (!fs.existsSync(paths2.join('/'))) {
      fs.mkdirSync(paths2.join('/'));
    }
  }
}

export function rmfileIfExists(path: string) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

// TODO: remove this.
export function readFileFromTemplatesSpec(src: string): string {
  return fs.readFileSync(join(__dirname, '../specs', src), 'utf8');
}

// TODO: remove this.
export function readFileFromRoot(src: string): string {
  return fs.readFileSync(src, 'utf8');
}
