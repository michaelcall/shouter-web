
import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../environments/environment";

@Injectable()
export class InterceptedHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(options)).catch((error: Response) => {
      if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
        console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
        window.location.href =  '/#/login';
      }
      return Observable.throw(error);
    });
  }

  // post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
  //   url = this.updateUrl(url);
  //   return super.post(url, body, this.getRequestOptionArgs(options)).catch((error: Response) => {
  //     if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
  //       console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
  //       window.location.href = '/#/login';
  //     }
  //     return Observable.throw(error);
  //   });
  // }
  //
  // option(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
  //   url = this.updateUrl(url);
  //   console.log("Options request ")
  //   return super.put(url, body, this.getRequestOptionArgs(options));
  // }
  //
  // put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
  //   url = this.updateUrl(url);
  //   return super.put(url, body, this.getRequestOptionArgs(options));
  // }
  //
  // delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
  //   url = this.updateUrl(url);
  //   return super.delete(url, this.getRequestOptionArgs(options));
  // }

  // private updateUrl(req: string) {
  //   return  environment.origin + req;
  // }

  private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {

    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    //  this.options.headers.append('Content-Type', 'application/json');

    return options;
  }
}
