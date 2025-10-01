import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';

export type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private readonly breakpoints: Record<ScreenSize, string> = {
    '2xl': '(min-width: 96rem)',
    xl: '(min-width: 80rem)',
    lg: '(min-width: 64rem)',
    md: '(min-width: 48rem)',
    sm: '(max-width: 47.999rem)',
  };
  private breakpointObserver = inject(BreakpointObserver);
  private breakpointStates = toSignal(
    this.breakpointObserver.observe(Object.values(this.breakpoints)),
    { initialValue: { matches: false, breakpoints: {} } },
  );

  screenSize = computed<ScreenSize | null>(() => {
    const states: Record<string, boolean> = this.breakpointStates().breakpoints;
    for (const key in this.breakpoints) {
      const size = key as ScreenSize;
      const media = this.breakpoints[size];

      if (states[media]) return size;
    }
    return null;
  });
}
