import { ADD_NEW_COMMENT, ADD_NEW_FEED, LOAD_INITIAL_FEED, LOADING_COMPONENTS } from '../api/FIUtils';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducer/FIReducer';
import { FeedService } from '../service/FeedService';
import { Injectable } from '@angular/core';

@Injectable()
export class FIAction {
    constructor(private ngRedux: NgRedux<IAppState>, private feedService: FeedService) {
    }
    addNewFeedCommentReducer(payload: any) {
        return { type: ADD_NEW_COMMENT, payload };
    }
    addNewFeedItemReducer(payload: any) {
        return { type: ADD_NEW_FEED, payload };
    }
    loadInitialFeedReducer(payload:any) {
        return { type: LOAD_INITIAL_FEED, payload };
    }
    loadingComponentWhileWaiting() {
        return { type: LOADING_COMPONENTS };
    }
    addNewFeedItemAction(newFeed:any) {
        this.ngRedux.dispatch(this.addNewFeedItemReducer(newFeed));
    }
    addNewFeedCommentAction(newCommentObj: any) {
        this.ngRedux.dispatch(this.addNewFeedCommentReducer(newCommentObj));
    }
    loadInitialFeedAction() {
        let feed = {};
        this.ngRedux.dispatch(this.loadingComponentWhileWaiting());
        setTimeout(() => {
            this.feedService.getFeedData().then((resp) => {
                this.ngRedux.dispatch(this.loadInitialFeedReducer(resp));
            });
        }, 1000);
    }
}
