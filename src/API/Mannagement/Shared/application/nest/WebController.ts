import { Res, NotFoundException } from '@nestjs/common';
export class WebController {

  protected response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; s: any; }; };

  protected redirectWithMessage(route: string, message: string) {
    return this.response.status(200).send(message)
  }

  protected responseWithMessage(message?: string) {
    return this.response.status(404).send(message);
  }

  protected resposneWithData(data) {
    return this.response.status(200).send(JSON.stringify(data));
  }

  protected responseWithError(err: Error | string) {

    if (err instanceof NotFoundException) {
      this.response404(err);
    }

    this.response500(err);

  }

  public response400(message: string) {
    return this.response.status(400).send(message)
  }

  public response404(err: Error) {
    return this.response.status(404).send(JSON.stringify(err));
  }

  public response500(err: Error | string) {
    return typeof (err) == 'object' ? this.response.status(500).send(err.message) : this.response.status(500).send(err)
  }

}
