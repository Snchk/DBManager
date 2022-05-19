import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../shared/services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})

export class ClientDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetClient(this.getId).subscribe(res => {
      this.updateForm.setValue({
        acqid: res['acqid'],
        name: res['name'],
        caid: res['caid'],
        description: res['description']
      });
    });

    this.updateForm = this.formBuilder.group({
      acqid: [''],
      name: [''],
      caid: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.crudService.updateClient(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/client-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
