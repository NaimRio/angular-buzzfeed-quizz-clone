import { Component, OnInit } from '@angular/core';
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.css']
})
export class FooterLinksComponent implements OnInit {
  fafacebook = faFacebook
  faLinkedin = faLinkedin
  faGithub = faGithub
  constructor() { }

  ngOnInit(): void {
  }

}
