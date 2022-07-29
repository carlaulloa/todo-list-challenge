// app/button-cell-renderer.component.ts

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html'
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.params = params;
    return true;
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnEditHandler(event: any) {
    console.log(this.params)
    this.params.editClicked(this.params);
  }

  btnDeleteHandler(event: any) {
    this.params.deleteClicked(this.params);
  }
}
