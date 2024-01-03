import { Module } from "@nestjs/common";
import { globSync } from "glob";
import { resolve } from "path";
import {
  ComponentEnhanceLoadType,
  LoaderEnhancedControllerDefine,
  LoaderEnhancedExportDefine,
  LoaderEnhancedImportDefine,
  LoaderEnhancedProviderDefine,
  ModuleLoaderMetadata,
  NestControllerDefine,
  NestExportDefine,
  NestImportDefine,
  NestProviderDefine,
} from "./interfaces";

function isObj(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isGlobLoadConfig(obj: unknown) {
  return isObj(obj) && typeof (obj as ComponentEnhanceLoadType).pattern === "string";
}

function mergeMeta<T, R>(controls: T[] = []): R[] {
  const batchMetaDefine = controls.filter((v) => isGlobLoadConfig(v)) as ComponentEnhanceLoadType[];
  const transmissionMetaDefine = controls.filter((v) => !isGlobLoadConfig(v)) as unknown as R[];
  let parsedMetaRecord: R[] = [];
  batchMetaDefine.forEach((config) => {
    const moduleFiles = globSync(config.pattern, {
      cwd: config.ctxDir,
      ignore: config.exclude || [],
    });
    parsedMetaRecord = parsedMetaRecord.concat(
      moduleFiles.reduce((accumulateImports, file) => {
        const absPath = resolve(config.ctxDir, file);
        const defineModuleEntry = require(absPath);
        const defineModule = Object.values(defineModuleEntry);
        return accumulateImports.concat(defineModule);
      }, [])
    );
  });
  const mergedImports: R[] = [...transmissionMetaDefine, ...parsedMetaRecord];
  return mergedImports as R[];
}

export function EnhancedModule(metadata: ModuleLoaderMetadata): ClassDecorator {
  const imports = mergeMeta<LoaderEnhancedImportDefine, NestImportDefine>(metadata.imports);
  const controllers = mergeMeta<LoaderEnhancedControllerDefine, NestControllerDefine>(metadata.controllers);
  const providers = mergeMeta<LoaderEnhancedProviderDefine, NestProviderDefine>(metadata.providers);
  const exportsDefine = mergeMeta<LoaderEnhancedExportDefine, NestExportDefine>(metadata.exports);
  return Module({
    imports,
    controllers,
    providers,
    exports: exportsDefine,
  });
}
