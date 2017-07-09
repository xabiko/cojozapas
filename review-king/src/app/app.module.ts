import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddReviewPage } from '../pages/add-review/add-review';
import { ChatPage } from '../pages/chat/chat';
import { Reviews } from '../providers/reviews/reviews';
import { Chat } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddReviewPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Reviews,
    Chat
  ]
})
export class AppModule {}
