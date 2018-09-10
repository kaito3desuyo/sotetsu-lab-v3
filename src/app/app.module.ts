import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ErrorsModule } from './modules/errors.module';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { TopComponent } from './pages/top/top.component';

@Injectable()
class UIErrorHandler extends ErrorHandler {
    constructor() {
        super();
    }
    handleError(error) {
        super.handleError(error);
        console.error('UIError!');
        // alert(`Error occurred:${error.message}`);
    }
}

@NgModule({
    declarations: [AppComponent, TopComponent],
    imports: [
        ErrorsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatRadioModule,
        FlexLayoutModule,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: UIErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
