import {Component, OnInit, OnDestroy} from '@angular/core';
import {MovieStatusService} from '../../../movie/apis/movie-status.service';
import {UiService} from '../../../shared/core/ui.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MovieFacadeService} from '../../../movie/facades/movie-facade.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {Subject} from 'rxjs';
import {LocalStorageItems} from '../../../shared/models/enums';
import {DeleteModalComponent} from '../../../shared/components/delete-modal/delete-modal.component';

interface MovieData {
  id: number;
  date: Date;
  name: string;
  organizer: string;
  approved: string;
  ticketSold: number;
  totalTicket: number;
  revenue: number;
  status: string;
  action: { label: string, link: string, id: number }[];
}

const MOVIE_DATA: MovieData[] = [
  {
    id: 1,
    date: new Date(),
    name: '30 Billion Concert II',
    organizer: 'Skillz',
    approved: 'No',
    ticketSold: 2,
    totalTicket: 10,
    revenue: 5000,
    status: 'Cinema',
    action: [
      {
        label: 'View',
        link: '',
        id: 0,
      },
      {
        label: 'Edit',
        link: '2/edit/basic-info',
        id: 0,
      },
      {
        label: 'Copy URL',
        link: '',
        id: 0,
      },
      {
        label: 'Postpone',
        link: '',
        id: 0,
      }
    ]
  }
];

@Component({
  selector: 'app-organizer-movie',
  templateUrl: './organizer-movie.component.html',
  styleUrls: ['./organizer-movie.component.scss']
})
export class OrganizerMovieComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tabs = ['all movies', 'my movies'];
  openTab = 'all movies';

  movieStatuses: any;
  organizerMovies: any[] = [];
  currentUser: any = this.authService.currentUserValue;
  movieTableSource: any;
  ticketQtySold: any[] = [];
  ticketsQty: any;
  ticketSalesRevenue: any;
  isMobile = false;

  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<MovieData>(MOVIE_DATA);
  displayColumns = ['select', 'date', 'event', 'organizer', 'approved', 'ticketSold', 'revenue', 'action'];
  // displayColumns = ['select', 'date', 'event', 'cinema', 'approved', 'ticketSold', 'revenue', 'status', 'action'];


  constructor(private movieStatusService: MovieStatusService,
              private uiService: UiService,
              private router: Router,
              private movieFacade: MovieFacadeService,
              private authService: AuthenticationService,
              private baseService: BaseService) {
    this.initializeOrganizerMovies().then();
  }

  ngOnInit(): void {
    this.movieStatusService.status$.subscribe(
      statusesData => {
        this.movieStatuses = statusesData.data;
        this.dtTrigger.next();
      },
      error => {
        this.uiService.openSnotify(error, 'Error fetching movie status', 'error');
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searchDelay: 100,
      processing: true,
      searching: true,
      responsive: true,
      deferLoading: 100,
    };
  }

  switchTab(tabName: string): void {
    this.openTab = tabName;
  }
  private async initializeOrganizerMovies(): Promise<void> {
    await this.movieFacade.getOrganizerMovies(this.currentUser.id).subscribe(
      response => {
        this.organizerMovies = response.data;
        this.movieTableSource = new MatTableDataSource<MovieData>(this.prepareOrganizerMoviesTableDataSource());
        console.log('this.movieTableSource => ', this.movieTableSource);
        console.log('this.organizerMovies => ', this.organizerMovies);
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching your events.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      },
    );
  }

  private prepareOrganizerMoviesTableDataSource(): any[] {
    const movieContainer: MovieData[] = [];
    this.organizerMovies.forEach((event: any) => {
      // if (this.currentUser.role === ('admin' || 'staff'))
      const tempMovie: MovieData = {
        id: event.id,
        date: event.start_date,
        name: event.name,
        organizer: this.currentUser.name,
        approved: event.is_published,
        ticketSold: 100,
        totalTicket: 50000,
        revenue: 0,
        status: event.movie_status_id,
        action: [
          {label: 'View', link: `${event.id}/edit/dashboard`, id: event.id},
          {label: 'Edit', link: `${event.id}/edit/details`, id: event.id},
          {label: 'Copy URL', link: `${event.id}/edit/details`, id: event.id},
          // tslint:disable-next-line:triple-equals
          {label: event.is_published == 1 ? `${this.currentUser.role === (1 || 2) ? 'Reject' : 'Request Take-down'}` : `${this.currentUser.role === (1 || 2) ? 'Approve' : 'Request Approval'}`, link: `approve/${event.id}`, id: event.id}
        ]
      };

      movieContainer.push(tempMovie);
    });
    return movieContainer;
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: MovieData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openMenu(event: any, path: string, id: number): void {
    console.log('clicked', path);
    if (path.includes('approve') && this.currentUser.role === ('admin' || 'staff')) {
      this.baseService.storeLocalItem(LocalStorageItems.ADMIN_APPROVE_MOVIE, JSON.stringify(id));
      this.openApproveModal();
    }else if (path.includes('dashboard')) {
      this.router.navigateByUrl(`movies/${path}`);
    }else if (path.includes('details')) {
      this.router.navigateByUrl(`movies/${path}`);
    } else {
      // this.router.navigateByUrl(`/events/${path}`);
      this.router.navigateByUrl(`tickets/organizer/movies`);
      this.uiService.openSnackBar('Request sent successfully.', 'OK');
    }
  }

  openApproveModal(): void {
    const dialogRef = this.uiService.openDialog(DeleteModalComponent, this.isMobile, null);
    dialogRef.afterClosed().subscribe(
      approvePayload => {
        if (approvePayload) {
          const payload: number = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.ADMIN_APPROVE_MOVIE));
          this.uiService.busy = true;
          console.log('Approve ID ', payload);
          this.movieFacade.approveMovie(payload).subscribe(
            createdMovieStatus => {
              this.uiService.busy = false;
              this.uiService.openSnackBar('Movie Set successfully.', 'OK');
            },
            error => {
              this.uiService.busy = false;
              const errorMessage = this.baseService.processResponseError(error);
              this.uiService.openSnackBar(errorMessage, 'OK');
            }
          );
          this.baseService.removeLocalItem(LocalStorageItems.ADMIN_APPROVE_MOVIE);
          this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/organizer/movies`); });
        } else {
          this.uiService.openSnackBar('Error setting status', 'OK');
        }
      }
    );
  }


  ngOnDestroy(): void {
  }

}
