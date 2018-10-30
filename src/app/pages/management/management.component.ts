import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  navLinks: [
    {
      label: string;
      path: string;
    }
  ] = [
    {
      label: '車両',
      path: './vehicle'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
