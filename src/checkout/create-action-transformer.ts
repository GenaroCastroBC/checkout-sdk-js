import { Action } from '@bigcommerce/data-store';
import { from } from 'rxjs/observable/from';
import { catchError } from 'rxjs/operators';
import { Observable, Subscribable } from 'rxjs/Observable';

import { RequestErrorFactory } from '../common/error';

export default function createActionTransformer(
    requestErrorFactory: RequestErrorFactory
): (action: Subscribable<Action>) => Observable<Action> {
    return action$ => from(action$).pipe(catchError<Action, never>(action => {
        if (action instanceof Error || action.payload instanceof Error) {
            throw action;
        }

        if (isResponse(action.payload)) {
            throw { ...action, payload: requestErrorFactory.createError(action.payload) };
        }

        throw action;
    }));
}

function isResponse(object: any) {
    if (!object || typeof object !== 'object') {
        return false;
    }

    return ['body', 'headers', 'status', 'statusText'].every(key =>
        object.hasOwnProperty(key)
    );
}
