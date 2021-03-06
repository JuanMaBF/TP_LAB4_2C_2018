import { ElementRef, EventEmitter } from '@angular/core';
import { Ng2Uploader, UploadRejected, UploadedFile } from '../services/ng2-uploader';
export declare class NgFileDropDirective {
    el: ElementRef;
    events: EventEmitter<any>;
    onUpload: EventEmitter<any>;
    onPreviewData: EventEmitter<any>;
    onFileOver: EventEmitter<any>;
    onUploadRejected: EventEmitter<UploadRejected>;
    beforeUpload: EventEmitter<UploadedFile>;
    _options: any;
    options: any;
    files: any[];
    uploader: Ng2Uploader;
    constructor(el: ElementRef);
    initEvents(): void;
    filterFilesByExtension(): void;
    onChange(): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): any;
}
