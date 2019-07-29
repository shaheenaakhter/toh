import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../model/hero';
import { Injectable } from '@angular/core';
import { Villain } from 'src/app/model/villain';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const villains = [
      { id: 11, name: 'Quick Kill' },
      { id: 12, name: 'Gambit' },
      { id: 13, name: 'Flint' },
      { id: 14, name: 'Shadow Atlas' },
      { id: 15, name: 'Lockjaw' },
      { id: 16, name: 'Icarus' },
      { id: 17, name: 'Magnus' },
      { id: 18, name: 'Paladin' },
      { id: 19, name: 'Nimbus' },
      { id: 20, name: 'Vega' }
    ];
    return {heroes, villains};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  genId<T extends Hero | Villain>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}