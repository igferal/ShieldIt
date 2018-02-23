import { Room } from "./../model/room";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { rootRenderNodes } from "@angular/core/src/view";
import { Http } from "@angular/http";

@Injectable()
export class ImageService {
  constructor(private http: Http) {}

  getCardImage(theme: string) {
    return this.http.get(
      `https://api.qwant.com/api/search/images?count=1&offset=1&q=${theme}`
    );
  }
}
