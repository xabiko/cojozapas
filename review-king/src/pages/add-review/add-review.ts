import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'add-review-page',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {

  title: any;
  description: any;
  rating: any;

  constructor(public viewCtrl: ViewController) {

  }

  save(): void {

    let review = {
      title: this.title,
      description: this.description,
      rating: this.rating,
      time : new Date(),
    };

    this.viewCtrl.dismiss(review);

  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
