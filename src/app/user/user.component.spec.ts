import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

import { DataService } from '../shared/data.service';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    //testbed is main testing object,giving access to all these ,congigure my angular aplication for testing utilities 
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();//if we r not using the cli /any web pack base setup we need compile component so we nee to excute compileComponents();
    //only we r using webpack we don't neet them.webpack will do this
  }));

  // beforeEach(() => {

  //   fixture.detectChanges();//to update our properties
  // });
  // To check whether component is created or not
  it('should create', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  //to check whether service is working or not
  it('should use the user name from the service', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();//to update properties
    expect(userService.user.name).toEqual(component.user.name);
  });
  //to check whether ngIf is working correctly or not p tag should be display conditionally
  it('should display the user name if user is logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    component.isLoggedIn = true;
    fixture.detectChanges();//to update properties

    //to compile out code
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });
  //to check whether ngIf is working correctly or not p tag should be display conditionally
  it('shouldn\'t display the user name if user is not logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();//to update properties

    //to compile out code
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });

  //normal test for async data
  it('shouldn\'t fetch data successfully if not called aynchronously', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    //we realy dont need call real get method wchich get data from server, for test we can fake the getmethod
    //we can make fake implementation still that is asynchronous
    //i want to spy on data service whch i can access to like i did here for users  
    let dataService = fixture.debugElement.injector.get(DataService);

    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));//getDetails is method name from data service
    //spyOn() is provided be teting environment
    fixture.detectChanges();
    expect(component.data).toBe(undefined);

  });
  //normal test for async data  async wrapping the whole value here
  it('should fetch data successfully if  called aynchronously', async(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);

    let spy = spyOn(dataService, 'getDetails')//getDetails is method name from data service
      .and
      .returnValue(Promise.resolve('Data'));//we r returning our own value
    //spyOn() is provided be teting environment
    fixture.detectChanges();
    //once asynchronous task is finished
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');

    })

  }));

  //with fakeasync
  it('should fetch data successfully if  called aynchronously', fakeAsync(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);

    let spy = spyOn(dataService, 'getDetails')//getDetails is method name from data service
      .and
      .returnValue(Promise.resolve('Data'));//we r returning our own value
    //spyOn() is provided be teting environment
    fixture.detectChanges();
    tick();//once tick get executed we can finish all asynchronously tasks immediatly since we resolve it immediatly we can finish them we don't want to wait for 1500 seconds
      expect(component.data).toBe('Data');

  

  }));


});
