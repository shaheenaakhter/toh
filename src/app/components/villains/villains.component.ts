import { Component, OnInit } from '@angular/core';
import { Villain } from 'src/app/model/villain';
 import { VillianService } from 'src/app/services/villain.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {

  villains: Villain[];

  constructor(private villianService: VillianService) { }

  ngOnInit() {
    this.getVillians();
  }
  getVillians(): void {
    this.villianService.getItems()
    .subscribe(villains => { console.log(this.villains);
       this.villains = villains});
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villianService.addItem({ name } as Villain)
      .subscribe(hero => {
        this.villains.push(hero);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villianService.deleteItem(villain).subscribe();
  }

}
