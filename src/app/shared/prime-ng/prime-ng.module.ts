import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from "primeng/inputtext";
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from "primeng/password";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {SidebarModule} from 'primeng/sidebar';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PickListModule} from 'primeng/picklist';
import {RippleModule} from 'primeng/ripple';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
// import {PickListModule} from 'primeng/picklist';
import {SplitButtonModule} from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
const primeNg = [BsDatepickerModule.forRoot(),SplitButtonModule,TagModule,PanelMenuModule,RippleModule,PickListModule,CommonModule,InputSwitchModule,InputNumberModule,FileUploadModule,RadioButtonModule,FieldsetModule,SidebarModule,PasswordModule,DialogModule,TabViewModule, InputSwitchModule,InputTextareaModule,CheckboxModule,InputMaskModule,CalendarModule,MultiSelectModule,TooltipModule,ListboxModule,ConfirmPopupModule,ButtonModule,CardModule,OverlayPanelModule,TableModule,PaginatorModule,AutoCompleteModule,InputTextModule]

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    primeNg,
    
  ],
  exports: [primeNg,FormsModule,ReactiveFormsModule],
  providers: [DialogService, DynamicDialogConfig, DynamicDialogRef]
})
export class PrimeNgModule { }
