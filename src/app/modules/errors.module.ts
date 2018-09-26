import { NgModule, ErrorHandler } from '@angular/core';

import { ErrorsHandler } from './../handler/errors-handler';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        {
            provide: ErrorHandler,
            useClass: ErrorsHandler
        }
    ]
})
export class ErrorsModule {}
