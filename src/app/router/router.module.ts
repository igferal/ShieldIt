import { AppComponent } from "./../components/app.component/app.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateRoomComponent } from "../components/create.room.component/create.room.component";
import { MatFormFieldModule } from "@angular/material/form-field";

const routes: Routes = [
  { path: "", redirectTo: "createRoom", pathMatch: "full" },
  { path: "app/:id", component: AppComponent },
  { path: "app", component: AppComponent },
  { path: "createRoom", component: CreateRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
