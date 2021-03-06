import { createRequestErrorFactory } from '../common/error';
import { getErrorResponse } from '../common/http-request/responses.mock';

import GiftCertificateSelector from './gift-certificate-selector';
import GiftCertificateState from './gift-certificate-state';

describe('GiftCertificateSelector', () => {
    let giftCertificateSelector: GiftCertificateSelector;
    let state: { giftCertificates: GiftCertificateState };
    const errorFactory = createRequestErrorFactory();

    beforeEach(() => {
        state = {
            giftCertificates: {
                errors: {},
                statuses: {},
            },
        };
    });

    describe('#getApplyError()', () => {
        it('returns error if unable to apply', () => {
            const applyGiftCertificateError = errorFactory.createError(getErrorResponse());

            giftCertificateSelector = new GiftCertificateSelector({
                ...state.giftCertificates,
                 errors: { applyGiftCertificateError } ,
            });

            expect(giftCertificateSelector.getApplyError()).toEqual(applyGiftCertificateError);
        });

        it('does not returns error if able to apply', () => {
            giftCertificateSelector = new GiftCertificateSelector(state.giftCertificates);

            expect(giftCertificateSelector.getApplyError()).toBeUndefined();
        });
    });

    describe('#isApplying()', () => {
        it('returns true if applying a gift certificate', () => {
            giftCertificateSelector = new GiftCertificateSelector({
                ...state.giftCertificates,
                statuses: { isApplyingGiftCertificate: true },
            });

            expect(giftCertificateSelector.isApplying()).toEqual(true);
        });

        it('returns false if not applying a gift certificate', () => {
            giftCertificateSelector = new GiftCertificateSelector(state.giftCertificates);

            expect(giftCertificateSelector.isApplying()).toEqual(false);
        });
    });

    describe('#getRemoveError()', () => {
        it('returns error if unable to remove', () => {
            const removeGiftCertificateError = errorFactory.createError(getErrorResponse());

            giftCertificateSelector = new GiftCertificateSelector({
                ...state.giftCertificates,
                errors: { removeGiftCertificateError },
            });

            expect(giftCertificateSelector.getRemoveError()).toEqual(removeGiftCertificateError);
        });

        it('does not returns error if able to remove', () => {
            giftCertificateSelector = new GiftCertificateSelector(state.giftCertificates);

            expect(giftCertificateSelector.getRemoveError()).toBeUndefined();
        });
    });

    describe('#isRemoving()', () => {
        it('returns true if removing a gift certificate', () => {
            giftCertificateSelector = new GiftCertificateSelector({
                ...state.giftCertificates,
                statuses: { isRemovingGiftCertificate: true },
            });

            expect(giftCertificateSelector.isRemoving()).toEqual(true);
        });

        it('returns false if not removing a gift certificate', () => {
            giftCertificateSelector = new GiftCertificateSelector(state.giftCertificates);

            expect(giftCertificateSelector.isRemoving()).toEqual(false);
        });
    });
});
