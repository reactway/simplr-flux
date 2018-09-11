import * as flux from "flux";

import { DispatcherMessage, FluxAction } from "./contracts/actions";

export class DispatcherClass extends flux.Dispatcher<DispatcherMessage> {
    private isAnonymousObject(obj: {}): boolean {
        return obj.constructor.name === "Object";
    }

    /**
     * Dispatches a payload to all registered callbacks.
     *
     * @param {TAction} dispatcherMessage - Instance of a class.
     */
    public dispatch<TAction extends FluxAction>(dispatcherMessage: TAction): void;
    public dispatch<TAction>(dispatcherMessage: TAction): void;
    public dispatch<TAction>(dispatcherMessage: TAction | FluxAction): void {
        let payload: DispatcherMessage<TAction> | FluxAction;
        if (this.isAnonymousObject(dispatcherMessage)) {
            payload = dispatcherMessage as FluxAction;
        } else {
            payload = {
                type: "SIMPLR_ACTION",
                action: dispatcherMessage
            };
        }

        try {
            if (!this.isDispatching()) {
                super.dispatch(payload);
            } else {
                throw new Error("SimplrFlux.Dispatcher.dispatch(): Cannot dispatch in the middle of a dispatch.");
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const Dispatcher = new DispatcherClass();
