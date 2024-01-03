import { Abstract, DynamicModule, ForwardReference, Provider, Type } from "@nestjs/common";

export interface ComponentEnhanceLoadType {
  /**
   * 指定匹配的路径
   */
  pattern: string;
  /**
   * 指定加载的上下文路径
   */
  ctxDir?: string;
  /**
   * 排除的路径
   */
  exclude?: string[];
}

export type NestImportDefine = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference;

export type LoaderEnhancedImportDefine = NestImportDefine | ComponentEnhanceLoadType;

export interface ModuleLoaderMetadata {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports: Array<LoaderEnhancedImportDefine>;
  /**
   * Optional list of controllers defined in this module which have to be
   * instantiated.
   */
  controllers?: Array<Type<any> | ComponentEnhanceLoadType>;
  /**
   * Optional list of providers that will be instantiated by the Nest injector
   * and that may be shared at least across this module.
   */
  providers?: Array<Provider | ComponentEnhanceLoadType>;
  /**
   * Optional list of the subset of providers that are provided by this module
   * and should be available in other modules which import this module.
   */
  exports?: Array<
    | ComponentEnhanceLoadType
    | DynamicModule
    | Promise<DynamicModule>
    | string
    | symbol
    | Provider
    | ForwardReference
    | Abstract<any>
    | Function
  >;
}
