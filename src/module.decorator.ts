import { Module } from "@nestjs/common";
import { globSync } from "glob";
import {
  ComponentEnhanceLoadType,
  LoaderEnhancedImportDefine,
  ModuleLoaderMetadata,
  NestImportDefine,
} from "./interfaces";

function isObj(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isAutoLoadConfig(obj: unknown) {
  return isObj(obj) && typeof (obj as ComponentEnhanceLoadType).pattern === "string";
}

function mergeImports(imports: LoaderEnhancedImportDefine[]) {
  const batchImportDefine = imports.filter((v) => isAutoLoadConfig(v)) as ComponentEnhanceLoadType[];
  const transmissionImports = imports.filter((v) => !isAutoLoadConfig(v)) as NestImportDefine[];
  const parsedImports: NestImportDefine[] = [];
  batchImportDefine.forEach((config) => {
    const moduleFiles = globSync(config.pattern, {
      cwd: config.ctxDir,
      ignore: config.exclude || [],
    });
    moduleFiles.reduce((accumulateImports, file) => {
      const defineModuleEntry = require(file);
      const defineModule = Object.values(defineModuleEntry);
      return accumulateImports.concat(defineModule);
    }, []);
  });
  const mergedImports: NestImportDefine[] = [...transmissionImports, ...parsedImports];
  return mergedImports;
}

export function EnhancedModule(metadata: ModuleLoaderMetadata): ClassDecorator {
  const imports = mergeImports(metadata.imports);
  return Module({
    imports,
  });
}
