import { Component, OnInit } from '@angular/core';
import {UiService} from '../../../shared/core/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventFacadeService} from '../../facades/event-facade.service';
import {BaseService} from '../../../shared/facades/base.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {
  createdEvent: any = this.route.snapshot.data.event.data;
  isLoading = false;
  showEditableButtons = this.createdEvent.is_published !== 1;
  eventPublished: boolean = this.createdEvent.is_completed === 1;
  editablePagePaths = ['info', 'ticket'];

  constructor(private uiService: UiService,
              private route: ActivatedRoute,
              private router: Router,
              private eventFacade: EventFacadeService,
              private baseService: BaseService) { }

  ngOnInit(): void {
    this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
  }

  editButtonAction(targetButtonLabel: string): void {
    if (targetButtonLabel === this.editablePagePaths[0]) {
      this.unPublishEvent().then(success => {
        if (success) {
          console.log('Success ? ', success);
          this.navigateToPage(`events/${this.createdEvent.id}/edit/basic-info`);
        }
      }).catch(x => console.log(x));
    } else if (targetButtonLabel === this.editablePagePaths[1]) {
      this.unPublishEvent().then(success => {
        console.log('Success ? ', success);
        this.navigateToPage(`events/${this.createdEvent.id}/edit/publish`);
      }).catch(x => console.log(x));
    }
  }

  onCancel(): void {
    //
  }

  private navigateToPage(path: string): void {
    this.router.navigateByUrl(path);
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  async unPublishEvent(): Promise<boolean> {
    let success = false;
    this.uiService.busy = true;
    await this.eventFacade.unPublishEvent(this.createdEvent.id).subscribe(
      response => {
        this.uiService.busy = false;
        this.uiService.openSnotify(response.data, 'Prompt', 'success');
        success = true;
      },
      error => {
        this.uiService.busy = false;
        const errorMessage = this.baseService.processResponseError(error) ?? 'Operation failed. Please try again.';
        this.uiService.openSnotify(errorMessage, 'Prompt', 'warning');
        success = false;
      }
    );

    return success;
  }
}
