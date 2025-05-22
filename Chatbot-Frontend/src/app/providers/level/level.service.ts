import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from 'src/app/shared/interfaces/level.interface';
import { SERVER_NAME } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private ENDPOINT_URL: string = SERVER_NAME + '/levels';

  constructor(private http: HttpClient) {}

  getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.ENDPOINT_URL);
  }
}
