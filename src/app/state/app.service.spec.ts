import { TestBed, async } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AppService', () => {
  let appService: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [AppService]
    });

    appService = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('mock http,flush error.', () => {
    const emsg = 'deliberate 404 error';
    appService.get().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'error expectationFailOutput message');
      });

    const req = httpTestingController.expectOne(environment.base + 'init');
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('mock http,request.error.', () => {
    const emsg = 'deliberate 500 error';
    appService.get().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.headers.get('test')).toEqual('header-test-value', 'headers expectationFailOutput message')
        expect(error.error.message).toEqual(emsg, 'error.message expectationFailOutput message');
      });

    const req = httpTestingController.expectOne(environment.base + 'init');
    const mockError = new ErrorEvent('network error', {
      message: emsg,
    });

    // Respond with mock error
    req.error(mockError, {
      headers: {
        test: 'header-test-value'
      },
      status: 500,
      statusText: 'not found',
    });
  });
});
