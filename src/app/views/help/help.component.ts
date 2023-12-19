import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { environment } from 'src/environments/environment';
import * as _fromAction from "../../store/actions";
import * as _fromStore from "../../store";
import { Store } from '@ngrx/store';
import { HowToPlayres } from 'src/app/response/how-toPlayresponse';
import { isNgTemplate } from '@angular/compiler';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  HtpResponse: HowToPlayres | any
  arr = [
    { id: "1", item_text: "How to play?", item_textFr: "Comment jouer?", item_textar: "طريقة اللعب" },
    { id: "2", item_text: "How Many Lives?", item_textFr: "Combien de Vie?", item_textar: "كم عدد الارواح ؟" },
    { id: "3", item_text: "Category & Level", item_textFr: "Catégorie & Levels", item_textar: "الفئة و المستوى" },
    { id: "4", item_text: "Score Board", item_textFr: "Tableau des scores", item_textar: "لوحة النتائج" },
    // { id: "5", item_text: "Live Quiz", item_textFr: "Quiz en direct", item_textar: "مسابقة حيّة" },

  ]

  // arrAr=[
  //   {id:"1",item_text:"How to play?"},
  //   {id:"2",item_text:"How Many Lives?"},
  //   {id:"3",item_text:"Category & Level"},
  //   {id:"4",item_text:"Score Board"},
  //   {id:"5",item_text:"Live Quiz"},
  // ]
  itemId: string | undefined;
  image: any;
  locale: string;
  constructor(public dataS: DataShareService, public store: Store<_fromStore.MainPageState>) {

    let locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = localStorage.getItem('locale')
    }
  }

  ngOnInit(): void {
    this.pass(this.arr[0]);

  }

  pass(obj: any) {
    this.itemId = obj.item_text
    var formdata: any = {

      serviceId: environment.serviceId,
      portalId: environment.portalId
    }
    if (this.locale == 'fr') {
      formdata = { ...formdata, title: obj.item_textFr }

    }
    else if (this.locale == 'ar') {
      formdata = { ...formdata, title: obj.item_textar }
    }
    else {
      formdata = { ...formdata, title: obj.item_text }
    }

    this.store.dispatch(new _fromAction.howtoplay(formdata));
    this.store.select<any>(_fromStore.howToPlayResponse).subscribe((data: any) => {
      if (data) {
        this.HtpResponse = data;
        this.image = this.HtpResponse.helpList[0].imageUrl;

      }
    })
  }

}
