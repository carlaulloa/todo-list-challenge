import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Task } from '../models/task.model';
import { TaskStatesService } from '../services/task-states.service';
import { TasksService } from '../services/tasks.service';
import { BtnCellRenderer } from '../shared/btn-cell-renderer/btn-cell-renderer.component';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  columnDefs: ColDef[] = [];
  rowData: Task[] = [];

  formTask: FormGroup = new FormGroup({});

  addBtnText: string = 'Agregar';
  editBtnText: string = 'Actualizar';

  btnText: string = this.addBtnText;
  btnClass: string = 'btn-success';

  saving: boolean = false;

  taskStates: TaskState[] = [];

  gridOptions: GridOptions = {
    overlayNoRowsTemplate: '<span>No hay registros encontrados.</span>',
    rowData: [],
    columnDefs: [],
    getRowId: (params) => params.data._id,
  };
  rowNodeSelected: any;

  addAction: string = 'add';
  editAction: string = 'edit';
  currentAction: string = this.addAction;

  constructor(
    private readonly taskStateService: TaskStatesService,
    private readonly taskService: TasksService,
    private readonly datePipe: DatePipe,
    private readonly localeService: BsLocaleService,
    private readonly errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.localeService.use('es');
    this.formTask = new FormGroup({
      _id: new FormControl(),
      description: new FormControl(),
      state: new FormGroup({
        id: new FormControl(),
      }),
      startDate: new FormControl(),
      endDate: new FormControl(),
    });

    this.columnDefs = [
      { field: 'description', headerName: 'Descripción' },
      { field: 'state.name', headerName: 'Estado' },
      {
        field: 'startDate',
        headerName: 'Fecha Inicio',
        valueFormatter: (params) => {
          return (
            this.datePipe.transform(params.value, 'dd/MM/yyyy', 'UTC') || ''
          );
        },
      },
      {
        field: 'endDate',
        headerName: 'Fecha Fin',
        valueFormatter: (params) => {
          return (
            this.datePipe.transform(params.value, 'dd/MM/yyyy', 'UTC') || ''
          );
        },
      },
      {
        headerName: 'Acciones',
        cellRenderer: BtnCellRenderer,
        cellRendererParams: {
          editClicked: (params: any) => {
            this.rowNodeSelected = params.node;
            this.formTask.patchValue(this.formatData(params.data));
            this.btnText = this.editBtnText;
            this.currentAction = this.editAction;
          },
          deleteClicked: (params: any) => {
            this.rowNodeSelected = params.node;
            this.deleteTask();
          },
        },
      },
    ];

    this.taskStateService.getAll().subscribe((list) => {
      this.taskStates = list;
    });
  }

  ngAfterViewInit(): void {
    this.gridOptions.api?.setColumnDefs(this.columnDefs);
    this.taskService.getAll().subscribe(
      (list) => {
        this.gridOptions.api?.setRowData(list);
      },
      (err) => this.errorService.handleError(err)
    );
  }

  saveTask(): void {
    const data = this.formTask.value;
    const id = data._id;
    delete data._id;
    switch (this.currentAction) {
      case this.addAction: {
        this.saving = true;
        this.taskService.insert(data).subscribe(
          (newTask) => {
            this.gridOptions.api?.applyTransaction({
              add: [this.formatData(newTask)],
            });
            this.reset();
          },
          (err) => {
            this.errorService.handleError(err);
            this.reset();
          }
        );
        break;
      }
      case this.editAction: {
        this.taskService.update(id, data).subscribe(
          (updatedTask) => {
            this.gridOptions.api?.applyTransaction({
              update: [this.formatData(updatedTask)],
            });
            this.reset();
          },
          (err) => {
            this.errorService.handleError(err);
            this.reset();
          }
        );
        break;
      }
      default:
        return;
    }
  }

  deleteTask(): void {
    const data = this.rowNodeSelected.data;
    this.taskService.delete(data._id).subscribe(
      () => {
        this.gridOptions.api?.applyTransaction({ remove: [data] });
      },
      (err) => this.errorService.handleError(err)
    );
  }

  formatData(data: Task): Task {
    const { startDate = null } = data;
    const { endDate = null } = data;
    return {
      ...data,
      startDate,
      endDate,
    };
  }

  reset(): void {
    this.formTask.reset({});
    this.btnText = this.addBtnText;
    this.currentAction = this.addAction;
    this.rowNodeSelected = null;
    this.saving = false;
  }
}
