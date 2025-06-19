import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
   animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          })
        ], { optional: true }),

        query(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('800ms ease-in-out', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('1000ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class DashboardComponent {
 prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
