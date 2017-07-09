import { Component }      from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage }  from '../add-review/add-review';
import { ChatPage }  from '../chat/chat';
import { Zapa }           from '../../providers/reviews/zapa';
import { Reviews }        from '../../providers/reviews/reviews';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [ Reviews ]
})
export class HomePage {
  errorMessage: string;
  reviews: Zapa[];
  mode = 'Observable';

  constructor(public nav: NavController,
              private reviewService: Reviews,
              public modalCtrl: ModalController) {}

  ionViewDidLoad(){

    this.reviewService.getReviews()
                      .subscribe(
                        data  => this.reviews = data,
                        //data  => console.log(data),
                        error => this.errorMessage = <any>error);
  }

  addReview(){

    let modal = this.modalCtrl.create(AddReviewPage);

    modal.onDidDismiss(review => {
      if(review){
        //this.reviews.push(review);
        this.reviewService.createReview(review)
                          .subscribe(
                            data  => this.reviews.unshift(data),
                            error => this.errorMessage = <any>error);
      }
    });

    modal.present();

  }

  deleteReview(review){

    //Remove locally
      let index = this.reviews.indexOf(review);

      if(index > -1){
        this.reviews.splice(index, 1);
      }

    //Remove from database
    this.reviewService.deleteReview(review._id)
                      .subscribe(
                        data => console.log(data));
  }

  goToChat(){
    this.nav.push(ChatPage);
  }

}
