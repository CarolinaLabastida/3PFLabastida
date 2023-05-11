import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from './services/user.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<User>();
  subscriptionRef: Subscription | null;

  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'role',
  ];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.subscriptionRef = this.notificationsService.showMessage().subscribe((text) => {
      Swal.fire( text, '', 'success');
    })
  }

  ngOnInit(): void {
    this.userService.getUsers() 
    .subscribe({
      next: (users) => {
        if(users) this.dataSource.data = users
      },
      error: (e) =>  Swal.fire( e, '', 'error'),
    })

  }

  ngOnDestroy(): void {
    this.subscriptionRef?.unsubscribe();
  }

  removeData(user: User) {
    this.userService.deleteUser(user.id);
    this.notificationsService.createMessage(`${user.name} ha sido eliminado(a)`);
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.userService.createUser(formData);
        this.notificationsService.createMessage(`${formData.name} ha sido sido creado(a)`);
      }
    });
  }

  editData(user: User): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        user
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.userService.editUser(user.id, formData, user.token)
        this.notificationsService.createMessage(`${formData.name} ha sido modificado(a)`);
      }
    });
  }

  showDetails(userId: number): void {
    this.router.navigate([userId], {
      relativeTo: this.activatedRoute
    })
  }
}
