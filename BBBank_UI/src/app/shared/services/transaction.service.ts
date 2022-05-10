import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LineGraphData } from '../models/line-graph-data';

@Injectable({
  providedIn: 'root',
})
export default class TransactionService {
  constructor(private httpClient: HttpClient) { }

  getLast12MonthBalances(userId?: string): Observable<LineGraphData> {
    if (userId === null) {
      return this.httpClient.get<LineGraphData>(`${environment.apiUrlBase}Transaction/GetLast12MonthBalances`);
    }
    return this.httpClient.get<LineGraphData>(`${environment.apiUrlBase}Transaction/GetLast12MonthBalances/${userId}`);
  }
}
