import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineGraphData } from '../models/line-graph-data';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export default class TransactionService {
  constructor(private httpClient: HttpClient) { }

  getLast12MonthBalances(accountId?: string): Observable<LineGraphData> {
    if (accountId === null) {
      return this.httpClient.get<LineGraphData>(`${environment.apiUrlBase}Transaction/GetLast12MonthBalances`);
    }
    return this.httpClient.get<LineGraphData>(`${environment.apiUrlBase}Transaction/GetLast12MonthBalances/${accountId}`);
  }
}
