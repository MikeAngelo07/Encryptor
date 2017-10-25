import { trigger, state, animate, transition, style } from '@angular/animations';

export const showHide= 
      trigger(
        'myAnimation',
        [
          transition(
          ':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateX(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}))
          ]
        )]
      );