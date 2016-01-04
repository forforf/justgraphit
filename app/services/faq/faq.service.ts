
import {QAs} from 'app/services/faq/faq'
import {Injectable} from 'angular2/core'

@Injectable()

export class FaqService {
    getFaqs() {
        return QAs;
    }
}
