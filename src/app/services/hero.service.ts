import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../model/hero';
import { MessageService } from '../shared/services/message.service';
import { ResourceService } from '../shared/services/resource.service';

@Injectable({ providedIn: 'root' })
export class HeroService extends ResourceService<Hero>{

    constructor(httpClient: HttpClient,
              messageService: MessageService)
             { super(httpClient,messageService,'api/heroes') }

}
