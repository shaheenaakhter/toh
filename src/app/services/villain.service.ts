import { Injectable } from '@angular/core';
import { ResourceService } from '../shared/services/resource.service';
import { Villain } from '../model/villain';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class VillianService extends ResourceService<Villain> {

    constructor(httpClient: HttpClient,
                 messageService: MessageService) { super(httpClient,messageService,'api/villains') }
  
  }
