import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.clientForm = this.formBuilder.group({
      acqid:[''],
      name: [''],
      caid: [''],
      description:['']
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.crudService.AddClient(this.clientForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/client-list'))
      }, (err) => {
        console.log(err);
      });
  }


}
