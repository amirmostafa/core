import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">{{'FOOTER_MESSAGE'|translate}}</span>
  `,
})
export class FooterComponent {
}
