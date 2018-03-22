import { CopyDialog } from "./components/create.room.component/dialog/copy.dialog";
import { MyHammerConfig } from "./util/hammer.config";
import { FindRoomComponent } from "./components/find.room.component/find.room.component";
import { AppRoutingModule } from "./router/router.module";
import { AppComponent } from "./components/app.component/app.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CreateRoomComponent } from "./components/create.room.component/create.room.component";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ClipboardModule } from "ngx-clipboard";
import { NotifierModule } from "angular-notifier";
import { GameComponent } from "./components/game.component/game.component";
import { MatChipsModule } from "@angular/material/chips";
import { HttpModule } from "@angular/http";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { LandingComponent } from "./components/landing.component/landing.component";
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { LogDialog } from "./components/game.component/logDialog/log.dialog";

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    CopyDialog,
    LogDialog,
    FindRoomComponent,
    GameComponent,
    LandingComponent
  ],
  entryComponents: [CopyDialog, LogDialog],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, "shieldit"),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ClipboardModule,
    NotifierModule,
    MatChipsModule,
    MatSelectModule,
    environment.production
      ? ServiceWorkerModule.register("/ngsw-worker.js")
      : []
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
