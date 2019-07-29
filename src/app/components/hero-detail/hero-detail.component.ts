import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero.service';
import { VillianService } from 'src/app/services/villain.service';
import { Villain } from 'src/app/model/villain';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  villains: Villain[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private villainService: VillianService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getVillains();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getItem(id)
      .subscribe(hero => this.hero = hero);
  }

  getVillains(): void {
    this.villainService.getItems()
    .subscribe(villains => { console.log(this.villains);
       this.villains = villains});
  }


  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateItem(this.hero)
      .subscribe(() => this.goBack());
  }
}
