import { Res } from '@nestjs/common';
export class WebController {

  protected response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; s: any; }; };

  protected redirectWithMessage(route: string, message: string) {
    return this.response.status(200).send(message)
  }

  protected responseWithMessage(message?: string) {
    return this.response.status(404).send(message);
  }

  protected resposneWithData(data: Object){
    return this.response.status(200).send(JSON.stringify(data));
  }

  protected responseWithError(err: Error | string) {
    return typeof (err) == 'object' ?
      this.response.status(500).send(err.message) :
      this.response.status(500).s
  }

}
