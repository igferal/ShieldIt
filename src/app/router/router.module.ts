import { GameComponent } from './../components/game.component/game.component';
import { FindRoomComponent } from "./../components/find.room.component/find.room.component";
import { AppComponent } from "./../components/app.component/app.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateRoomComponent } from "../components/create.room.component/create.room.component";
import { MatFormFieldModule } from "@angular/material/form-field";

const routes: Routes = [
  { path: "", redirectTo: "findRoom", pathMatch: "full" },
  { path: "findRoom/:id", component: FindRoomComponent },
  { path: "findRoom", component: FindRoomComponent },
  { path: "app", component: AppComponent },
  { path: "createRoom", component: CreateRoomComponent },
  { path: "game/:id", component: GameComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
