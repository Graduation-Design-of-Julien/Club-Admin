import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

export const getConfig = () => {
  const yamlPath = path.join('./config/config.yaml');
  const file = fs.readFileSync(yamlPath, 'utf-8');
  const config = parse(file);
  return config;
};
