/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../../src/module/ng2-uploader.module';
import * as import2 from '../../../src/services/ng2-uploader';
import * as import3 from '@angular/core/src/di/injector';
class Ng2UploaderModuleInjector extends import0.NgModuleInjector<import1.Ng2UploaderModule> {
  _Ng2UploaderModule_0:import1.Ng2UploaderModule;
  __Ng2Uploader_1:import2.Ng2Uploader;
  constructor(parent:import3.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _Ng2Uploader_1():import2.Ng2Uploader {
    if ((this.__Ng2Uploader_1 == null)) { (this.__Ng2Uploader_1 = new import2.Ng2Uploader()); }
    return this.__Ng2Uploader_1;
  }
  createInternal():import1.Ng2UploaderModule {
    this._Ng2UploaderModule_0 = new import1.Ng2UploaderModule();
    return this._Ng2UploaderModule_0;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import1.Ng2UploaderModule)) { return this._Ng2UploaderModule_0; }
    if ((token === import2.Ng2Uploader)) { return this._Ng2Uploader_1; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const Ng2UploaderModuleNgFactory:import0.NgModuleFactory<import1.Ng2UploaderModule> = new import0.NgModuleFactory(Ng2UploaderModuleInjector,import1.Ng2UploaderModule);