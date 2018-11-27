import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ GetDataService ]
})

export class FooterComponent implements OnInit {
  public logo ='./assets/images/logo.png';
  footerURL: string;
  footerData: any;
  lang : string;
  constructor(
    private http: HttpClient,
    private http2: HttpClient,
    private _getDataService: GetDataService,
    private route: ActivatedRoute
  ) { 
    // var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
    //   console.log(h);
    //   if(h < 400){

    //   }     
    
  }

  ngOnInit() {
    //change language
    this.route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
    this.footerURL = this._getDataService.getFooterURL();
    //this.logoURL = this._getDataService.getLogoURL();

     //Scroll the mouse and call the scrollFunction
     window.onscroll = () => {
      scrollFunction()
    };

     function scrollFunction() {
         // Check the cursor current position 
         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
             document.getElementById("backToTop").style.display = "block";
         } else {
             document.getElementById("backToTop").style.display = "none";
         }
     }

     // Click button to the top
     document.getElementById('backToTop').addEventListener("click", function(){
         document.body.scrollTop =  $("html, body").animate({ scrollTop: 0 }, "slow");
     });

    // Get infomation from strapi server
    this.http.get(this.footerURL).subscribe(data => {
      this.footerData = data;
      });
    }

  // Change social icon color when hover on it
  changeIcon(icon: string) {
      if (icon === "facebook") {
        $('#facebook-icon').attr("src","./assets/images/facebook-logo-hover.png");
      } else if (icon === "youtube") {
        $('#youtube-icon').attr("src","./assets/images/youtube-logo-hover.png");
      } else if (icon === "facebook-normal") {
        $('#facebook-icon').attr("src","./assets/images/facebook-logo.png");
      } else if (icon === "youtube-normal") {
        $('#youtube-icon').attr("src","./assets/images/youtube-logo.png");
      }
  }
}