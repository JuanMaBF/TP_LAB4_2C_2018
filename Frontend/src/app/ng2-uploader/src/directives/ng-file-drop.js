"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_uploader_1 = require("../services/ng2-uploader");
var NgFileDropDirective = (function () {
    function NgFileDropDirective(el) {
        var _this = this;
        this.el = el;
        this.onUpload = new core_1.EventEmitter();
        this.onPreviewData = new core_1.EventEmitter();
        this.onFileOver = new core_1.EventEmitter();
        this.onUploadRejected = new core_1.EventEmitter();
        this.beforeUpload = new core_1.EventEmitter();
        this.files = [];
        this.uploader = new ng2_uploader_1.Ng2Uploader();
        setTimeout(function () {
            _this.uploader.setOptions(_this.options);
        });
        this.uploader._emitter.subscribe(function (data) {
            _this.onUpload.emit(data);
            if (data.done) {
                _this.files = _this.files.filter(function (f) { return f.name !== data.originalName; });
            }
        });
        this.uploader._previewEmitter.subscribe(function (data) {
            _this.onPreviewData.emit(data);
        });
        this.uploader._beforeEmitter.subscribe(function (uploadingFile) {
            _this.beforeUpload.emit(uploadingFile);
        });
        setTimeout(function () {
            if (_this.events instanceof core_1.EventEmitter) {
                _this.events.subscribe(function (data) {
                    if (data === 'startUpload') {
                        _this.uploader.uploadFilesInQueue();
                    }
                });
            }
        });
        this.initEvents();
    }
    Object.defineProperty(NgFileDropDirective.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            this.uploader.setOptions(this.options);
        },
        enumerable: true,
        configurable: true
    });
    NgFileDropDirective.prototype.initEvents = function () {
        var _this = this;
        if (typeof this.el.nativeElement.addEventListener === 'undefined') {
            return;
        }
        this.el.nativeElement.addEventListener('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.files = Array.from(e.dataTransfer.files);
            if (_this.files.length) {
                _this.uploader.addFilesToQueue(_this.files);
            }
        }, false);
        this.el.nativeElement.addEventListener('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        this.el.nativeElement.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
    };
    NgFileDropDirective.prototype.filterFilesByExtension = function () {
        var _this = this;
        this.files = this.files.filter(function (f) {
            if (_this.options.allowedExtensions.indexOf(f.type) !== -1) {
                return true;
            }
            var ext = f.name.split('.').pop();
            if (_this.options.allowedExtensions.indexOf(ext) !== -1) {
                return true;
            }
            _this.onUploadRejected.emit({ file: f, reason: ng2_uploader_1.UploadRejected.EXTENSION_NOT_ALLOWED });
            return false;
        });
    };
    NgFileDropDirective.prototype.onChange = function () {
        if (!this.el.nativeElement.files || !this.el.nativeElement.files.length) {
            return;
        }
        this.files = Array.from(this.el.nativeElement.files);
        if (this.options.filterExtensions && this.options.allowedExtensions) {
            this.filterFilesByExtension();
        }
        if (this.files.length) {
            this.uploader.addFilesToQueue(this.files);
        }
    };
    NgFileDropDirective.prototype.onDragOver = function (event) {
        this.onFileOver.emit(true);
    };
    NgFileDropDirective.prototype.onDragLeave = function (event) {
        this.onFileOver.emit(false);
    };
    return NgFileDropDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "events", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "onUpload", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "onPreviewData", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "onFileOver", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "onUploadRejected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgFileDropDirective.prototype, "beforeUpload", void 0);
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgFileDropDirective.prototype, "options", null);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NgFileDropDirective.prototype, "onChange", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NgFileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], NgFileDropDirective.prototype, "onDragLeave", null);
NgFileDropDirective = __decorate([
    core_1.Directive({
        selector: '[ngFileDrop]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], NgFileDropDirective);
exports.NgFileDropDirective = NgFileDropDirective;
