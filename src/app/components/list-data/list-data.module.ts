import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListDataComponent } from './list-data.component';
import { ListDataRoutes } from './list-data.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ListDataRoutes),
        NgxDatatableModule
    ],
    exports: [],
    declarations: [
        ListDataComponent
    ],
    providers: [],
})
export class ListDataModule { }
