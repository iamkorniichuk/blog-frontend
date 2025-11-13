import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Tool, ToolApiService } from '../../services/tool-api';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
})
export class FooterComponent implements OnInit {
  private toolApiService = inject(ToolApiService);
  tools = signal<Tool[]>([]);

  async ngOnInit() {
    const newTools = await this.toolApiService.readAll();
    this.tools.set(newTools);
  }
}
