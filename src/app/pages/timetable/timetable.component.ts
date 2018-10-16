import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: [
        './timetable.component.css',
        './../../../assets/fonts/DiaPro-web/DiaPro.css'
    ]
})
export class TimetableComponent implements OnInit {
    tableFlg = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // クエリを判別し駅単位か路線単位かに分ける
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('station') === 'null') {
                this.tableFlg = false;
            } else {
                this.tableFlg = true;
            }
        });
    }
}
