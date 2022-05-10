import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import {
  Chart, LinearScale, CategoryScale, registerables,
} from 'chart.js';
import AppUser from 'src/app/shared/models/app-user';
import { LineGraphData } from 'src/app/shared/models/line-graph-data';
import TransactionService from 'src/app/shared/services/transaction.service';

Chart.register(LinearScale, CategoryScale);
Chart.register(...registerables);

@Component({
  selector: 'app-last6-month-graph',
  templateUrl: './last6-month-graph.component.html',
  styleUrls: ['./last6-month-graph.component.css'],
})

export default class Last6MonthGraphComponent implements OnInit {
  @ViewChild('SixMonthChart') myCanvas: ElementRef;

  lineGraphData: LineGraphData;

  loggedInUser?: AppUser;

  canvas: any;

  gradientChartOptionsConfigurationWithTooltipRed: any;

  public myChartData: any;

  public context: CanvasRenderingContext2D;

  constructor(private transactionService: TransactionService) {
    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
      responsive: true,
      scales: {
        yAxes:
        {
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: '#9e9e9e',
          },
        },

        xAxes:
        {
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9e9e9e',
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  ngAfterViewInit(): void {
    this.context = (this.myCanvas
      .nativeElement as HTMLCanvasElement).getContext('2d');
    this.transactionService
      .getLast12MonthBalances(this.loggedInUser?.id)
      .subscribe({
        next: (data: LineGraphData) => {
          this.lineGraphData = data;

          const gradientStroke = this.context.createLinearGradient(0, 230, 0, 50);

          gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
          gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
          gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); // blue colors

          this.myChartData = new Chart(this.context, {
            type: 'bar',
            data: {
              labels: this.lineGraphData?.labels.slice(-6),
              datasets: [{
                label: 'Last 6 Month Balances',
                backgroundColor: gradientStroke,
                hoverBackgroundColor: gradientStroke,
                borderColor: '#1f8ef1',
                borderWidth: 2,
                data: this.lineGraphData?.figures.slice(-6),
              }],
            },
            options: this.gradientChartOptionsConfigurationWithTooltipRed,
          });
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
