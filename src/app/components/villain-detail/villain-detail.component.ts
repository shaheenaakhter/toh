import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Villain } from 'src/app/model/villain';
import { VillianService } from 'src/app/services/villain.service';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {

  @Input() villain: Villain;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillianService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVillan();
  }

  getVillan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.villainService.getItem(id)
      .subscribe(villain => this.villain = villain);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.villainService.updateItem(this.villain)
      .subscribe(() => this.goBack());
  }

}
