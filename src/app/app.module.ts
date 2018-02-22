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
import {
  CreateRoomComponent,
  Dialog
} from "./components/create.room.component/create.room.component";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ClipboardModule } from "ngx-clipboard";
import { NotifierModule } from "angular-notifier";
import { GameComponent } from "./components/game.component/game.component";

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    Dialog,
    FindRoomComponent,
    GameComponent
  ],
  entryComponents: [Dialog],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, "shieldit"),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ClipboardModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
