
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from '../../models/image.model';
import { ImageService } from '../../services/image.service';
import { OfferFormDataService } from '../../services/offer/shared/offer-form-data.service';
import { Subject, takeUntil, take, switchMap, Observable, tap, catchError, of, forkJoin, map } from 'rxjs';
import { Notificationobjects } from '../../models/notification.model';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-dashbord-header',
  templateUrl: './dashbord-header.component.html',
  styleUrls: ['./dashbord-header.component.scss']
})
export class DashbordHeaderComponent implements OnInit {
  @ViewChild('notificationSound') notificationSound!: ElementRef;
  notificationslength:number = 0;
  notifications: Notificationobjects[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(public authService: AuthService, private router: Router, private imageService: ImageService,private notificationService: WebSocketService,) { }
  image!: ImageDTO;
  selectedFile: File | null = null;
  isUserMenuActive = false;
  isUserNotificationMenuActive = false;
  isUseremailActive = false;
  senderImage?: ImageDTO;

  ngOnInit(): void {
    this.notificationService.connectToWebSocket()
      .pipe(takeUntil(this.ngUnsubscribe), take(1))

      .subscribe(() => this.loeadnewNotification())
    this.getAllNotificationsForEntreprise();
    this.loadUserDataAndImage()

    // this.imageService.loadImageByUserId(this.notifications.senderId).subscribe(imagesender => {
    //   this.senderImage = imagesender;
    //   console.log('Image loade',this.senderImage)    
    // });
  }

  toggleUserMenu(): void {
    this.isUserMenuActive = !this.isUserMenuActive;
  }
  toggleUserMenunot(): void {
    this.isUserNotificationMenuActive = !this.isUserNotificationMenuActive;
  }
  toggleUserEmail(): void {
    this.isUseremailActive = !this.isUseremailActive;
  }
  loadUserDataAndImage(): void {
    const loggedInUserId = this.authService.getLoggedInUserId();

    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }


        this.imageService.loadImageByUserId(loggedInUserId).subscribe(
          (data) => {
            this.image = data;
          },
          (error) => {
            console.error('Error loading image:', error);
          }
        );
  
  }

  onLogout() {
    this.authService.logout();
  }





  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loeadnewNotification() {
    this.notificationService.getNotifications().subscribe(notification => {
      console.log('Received new notification:', notification.senderId);
      this.imageService.loadImageByUserId(notification.senderId).subscribe(
        (imageData) => {
          notification.senderImage = imageData; // Add the senderImage to the notification object
          this.notifications.unshift(notification); // Add the updated notification to the notifications array
          this.notificationslength++; 
          this.notificationSound.nativeElement.play();// Increment the notificationslength by 1
        }
      );
    });
  }
  
  
  

  

  loadSenderImage(senderId: string): Observable<ImageDTO> {
    return this.imageService.loadImageByUserId(senderId);
  }
  
  getAllNotificationsForEntreprise() {
    const entrepriseId = this.authService.getLoggedInUserId();
    if (!entrepriseId) {
      console.log('Invalid authorization token');
      return;
    }
    this.notificationService.getAllNotifications(entrepriseId).pipe(
      switchMap((notifications: Notificationobjects[]) => {
        const loadSenderImageObservables = notifications.map(notification =>
          this.loadSenderImage(notification.senderId).pipe(
            tap((senderImage: ImageDTO) => {
              notification.senderImage = senderImage;
            }),
            catchError(() => of(null))
          )
        );
        return forkJoin(loadSenderImageObservables).pipe(map(() => notifications));
      })
    ).subscribe((data) => {
      console.log(data);
      this.notifications = data;
      this.notificationslength = this.notifications.length;
    });
  }
  


  timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    if (diffInSeconds < 60) return `Now`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  }

}