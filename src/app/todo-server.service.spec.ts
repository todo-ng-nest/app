import { TestBed } from '@angular/core/testing';

import { TodoServerService } from './todo-server.service';

describe('TodoServerService', () => {
  let service: TodoServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
