import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ibot';
  image1 : string
  image2 : string
  apiURL: string = 'https://ibot-9c961-default-rtdb.firebaseio.com/users.json';
  constructor(private httpClient: HttpClient){

  }

  ngOnInit(){
    // this.postData()

  }


  postData(){
    this.httpClient.post(this.apiURL,{name : 'image1',url:'https://firebasestorage.googleapis.com/v0/b/ibot-9c961.appspot.com/o/image1.PNG?alt=media&token=070980c5-ab45-4593-94d2-0ff1cf66b448'}).subscribe(
      res =>{
        console.log('res',res)

        this.httpClient.post(this.apiURL,{name : 'image2',url:'https://firebasestorage.googleapis.com/v0/b/ibot-9c961.appspot.com/o/image2.png?alt=media&token=68e62bc5-7113-4fc4-a0ec-6a1bd5bb978d'}).subscribe(
          res =>{
            console.log('res',res)
          }
        )
      }
    )
  }

  getImage1(){
    this.httpClient.get(this.apiURL).subscribe(
      res =>{
        console.log('res',res )
        const arrayOfObj = Object.entries(res).map((e) => ( { [e[0]]: e[1] } ));
        console.log('arrayOfObj',arrayOfObj)

        this.image1 = this.findNestedObj(res,"name","image1").url

      }
    )
  }

  getImage2(){
    this.httpClient.get(this.apiURL).subscribe(
      res =>{
        console.log('res',res)
        this.image2 = this.findNestedObj(res,"name","image2").url

      }
    )
  }

  findNestedObj(entireObj, keyToFind, valToFind) {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    console.log('foundObj',foundObj)
    return foundObj;
  };
}
