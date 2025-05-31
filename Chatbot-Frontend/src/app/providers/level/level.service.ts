import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Level } from 'src/app/shared/interfaces/level.interface';
import { SERVER_NAME } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private ENDPOINT_URL: string = SERVER_NAME + '/levels';

  constructor(private http: HttpClient) { }

  getAllLevels(): Observable<Level[]> {
    return this.http.get<any[]>(this.ENDPOINT_URL).pipe(
      map(levels => levels.map(l => ({
        id: l.v_id,
        name: l.v_name
      })))
    );
  }
}
