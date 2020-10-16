import {
  existsSync,
  mkdirSync,
  PathLike,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join, sep } from 'path';

const isDirectory = (path: PathLike) => statSync(path).isDirectory();

const isFile = (path: PathLike) => statSync(path).isFile();

export const writeJsonFileSync = (data: unknown, ...paths: string[]): void => {
  const json = JSON.stringify(data, null, 2);
  const filePath = join(...paths);
  ensureDirectoryStructureExists(filePath);
  writeFileSync(filePath, json);
};

export const getParentDirs = (filePath: string): string[] => {
  const paths = filePath.split(sep).filter((dir) => dir !== '.');

  const dirs = paths.splice(0, paths.length - 1);
  return dirs;
};

const ensureDirectoryStructureExists = (filePath: string) => {
  const dirs = getParentDirs(filePath);
  let partialPath = '.';
  dirs.map((dir) => {
    partialPath = [partialPath, dir].join(sep);
    ensureDirectoryExists(partialPath);
  });
};

const ensureDirectoryExists = (directoryPath: string) => {
  if (existsSync(directoryPath)) {
    return;
  }
  mkdirSync(directoryPath);
};

export const jsonFrom = (filePath: string): unknown => {
  if (!isFile(filePath)) {
    return {};
  }
  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const fileExists = (filePath: string): boolean => {
  if (existsSync(filePath) && isFile(filePath)) {
    return true;
  }

  if (existsSync(filePath) && isDirectory(filePath)) {
    throw new Error(`File '${filePath}' is a directory but should be a file.`);
  }

  return false;
};
