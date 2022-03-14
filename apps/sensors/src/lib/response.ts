export type ResponseStatus = 500 | 200 | 400;

export type Response<B = string, T extends ResponseStatus = ResponseStatus> = T extends 500
    ? { status: 500; body: MessageBody }
    : T extends 400
    ? { status: 400; body: MessageBody }
    : {
          status: 200;
          body: B;
      };

export type MessageBody = { message: string };

export type Error = Response<500>;
export type Invalid = Response<400>;
export type Success<B> = Response<B, 200>;
export type SuccessOrErrorResponse<B> = Error | Success<B>;
export type SomeResponse<B> = Error | Success<B> | Invalid;
export type SuccessOrError<B> = Promise<SuccessOrErrorResponse<B>>;

export const error = (message: string): Error => ({ body: { message }, status: 500 });
export const invalid = (message: string): Invalid => ({ body: { message }, status: 400 });
export const successMsg = (message: string): Success<MessageBody> => ({
    body: { message },
    status: 200
});
export const success = <B>(body: B): Success<B> => ({ body, status: 200 });
