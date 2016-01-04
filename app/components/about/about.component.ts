import {Component, OnInit} from 'angular2/core';
import {FaqService} from 'app/services/faq/faq.service'


@Component({
    selector: 'about',
    templateUrl: 'app/templates/about.html',
    providers: [FaqService]
})

export class AppAboutComponent implements OnInit {
    public faqs: Array< String[] >;

    constructor(private _faqs: FaqService){}


    getFaqs() {
        this.faqs = this._faqs.getFaqs();
    }

    ngOnInit() {
        this.getFaqs();
    }
}
