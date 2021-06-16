import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  tickets = [
    {
      name: '30 Billion Concert II',
      date: new Date(),
      quantity: 30,
      ticketType: 'VVIP',
      ticketId: '00135640',
      price: 300000,
      status: 'Active',
      actions: ['Cancel']
    },
    {
      name: 'Inventors NG Ideas Hunt 2021',
      date: new Date(),
      quantity: 17,
      ticketType: 'REGULAR',
      ticketId: '00000640',
      price: 3000,
      status: 'Active',
      actions: ['Cancel']
    }
  ];

  displayColumns = ['select', 'name', 'date', 'qty', 'type', 'id', 'price', 'status', 'actions'];

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: false,
    };
  }

}
