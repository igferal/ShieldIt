import { keyframes, style } from "@angular/animations";

export const slideRight = [
  style({ transform: "translate3d(20%, 0, 0)", offset: 0.2 }),
  style({ transform: "translate3d(40%, 0, 0)", offset: 0.4 }),
  style({ transform: "translate3d(60%, 0, 0)", offset: 0.6 }),
  style({ transform: "translate3d(80%, 0, 0)", offset: 0.8 }),
  style({ transform: "translate3d(100%, 0, 0)", offset: 1 })
];

export const slideLeft = [
  style({ transform: "translate3d(-20%, 0, 0)", offset: 0.2 }),
  style({ transform: "translate3d(-40%, 0, 0)", offset: 0.4 }),
  style({ transform: "translate3d(-60%, 0, 0)", offset: 0.6 }),
  style({ transform: "translate3d(-80%, 0, 0)", offset: 0.8 }),
  style({ transform: "translate3d(-100%, 0, 0)", offset: 1 })
];
