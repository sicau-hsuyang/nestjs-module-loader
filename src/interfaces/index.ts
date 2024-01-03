import { Abstract, DynamicModule, ForwardReference, Provider, Type } from "@nestjs/common";

export interface ComponentEnhanceLoadType {
  /**
   * 指定匹配的路径
   */
  pattern: string;
  /**
   * 指定加载的上下文路径
   */
  ctxDir: string;
  /**
   * 排除的路径
   */
  exclude?: string[];
}

export type NestImportDefine = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference;

export type NestControllerDefine = Type<any>;

export type NestProviderDefine = Provider;

export type NestExportDefine =
  | DynamicModule
  | Promise<DynamicModule>
  | string
  | symbol
  | Provider
  | ForwardReference
  | Abstract<any>
  | Function;

export type LoaderEnhancedImportDefine = NestImportDefine | ComponentEnhanceLoadType;

export type LoaderEnhancedControllerDefine = NestControllerDefine | ComponentEnhanceLoadType;

export type LoaderEnhancedProviderDefine = NestProviderDefine | ComponentEnhanceLoadType;

export type LoaderEnhancedExportDefine = NestExportDefine | ComponentEnhanceLoadType;

export interface ModuleLoaderMetadata {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports: ComponentEnhanceLoadType | Array<LoaderEnhancedImportDefine>;
  /**
   * Optional list of controllers defined in this module which have to be
   * instantiated.
   */
  controllers: ComponentEnhanceLoadType | Array<LoaderEnhancedControllerDefine>;
  /**
   * Optional list of providers that will be instantiated by the Nest injector
   * and that may be shared at least across this module.
   */
  providers: ComponentEnhanceLoadType | Array<LoaderEnhancedProviderDefine>;
  /**
   * Optional list of the subset of providers that are provided by this module
   * and should be available in other modules which import this module.
   */
  exports: ComponentEnhanceLoadType | Array<LoaderEnhancedExportDefine>;
}
