import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Review} from '../../../models/review.model';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {
  @Output() getDetail = new EventEmitter<boolean>();
  @Input() review: Review = new Review(
    '선생님~~ 감사합니다^^',
    '첫 아이 처음 검정고시 처음 입시를 치루는 저에게는 모든 게 낯설었어요. ' +
    '알아보는 걸 잘 하지만 다 신중하게 해야 하고 조심스러워서 잘못될까 싶고 여기저기 알아보고 상담 받아봤는데 만족함을 얻지 못했습니다. ' +
    '사실 검정고시로 입시를 치룬다는 게 쉬운 일은 아닌 것 같아요. ' +
    '그래서 누군가의 도움이 절실한데 그저 다른 수단으로만 이용하는 게 좀 속상했는데 강예은 선생님의 유튜브 시청을 하고 나서 진짜 이분께 부탁드리면 좋을 것 같더라구요. ' +
    '무료 수준으로 이렇게 잘 정리된 상담 너무 감사드려요. 아직 원서도 넣기 전이라 앞으로도 선생님 도움이 많이 필요할 것 같습니다^^ 끝까지 함께 해주시고 어제 상담 감사했습니다♡',
    '박서윤',
    'qkrtjdbs',
    '2020-09-07 13:30',
  );
  @Input() reviewId = 0;
  @Input() objId = '';
  @Input() reviewList: [number, Review, string][] = [];
  otherReviewList: [number, Review, string][] = [];

  constructor() { }

  ngOnInit(): void {
    this.onChangeOtherReviewList();
  }

  onChangeGetDetail(): void{
    this.getDetail.emit(false);
  }

  onChangeOtherReviewList(): void{
    if (this.reviewList.length !== 0){
      if (this.reviewId + 4 <= this.reviewList.length){
        for (let i = this.reviewId + 1; i < this.reviewId + 4 ; i++){
          this.otherReviewList.push(this.reviewList[i]);
        }
      }else{
        const leftObjs = 3 - (this.reviewList.length - this.reviewId);
        console.log(leftObjs);
        for (let i = this.reviewId + 1; i < this.reviewList.length ; i++){
          this.otherReviewList.push(this.reviewList[i]);
        }
        for (let i = 0; i <= leftObjs; i++){
          this.otherReviewList.push(this.reviewList[i]);
        }

        console.log(this.otherReviewList);
      }
    }
  }

  onChangePostDetail(order: number): void{
    this.reviewId = order;
    this.objId = this.reviewList[order][2];
    this.review = this.reviewList[order][1];
    this.otherReviewList = [];
    this.onChangeOtherReviewList();
  }

}
