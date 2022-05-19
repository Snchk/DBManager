import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})

export class ClientListComponent implements OnInit {

  Clients:any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetClients().subscribe(res => {
      console.log(res)
      this.Clients =res;
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteClient(id).subscribe((res) => {
        this.Clients.splice(i, 1);
      })
    }
  }

}
