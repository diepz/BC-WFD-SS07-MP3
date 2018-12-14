import {Component, OnInit, OnDestroy} from '@angular/core';
import {YoutubeService} from '../youtube.service';
import {Subscription} from 'rxjs/index';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-youtube-player',
    templateUrl: './youtube-player.component.html',
    styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy {
    song: any;
    sub: Subscription;

    constructor(public youtubeService: YoutubeService, public activatedRouter: ActivatedRoute, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.sub = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
            const id = paramMap.get('id');
            this.song = this.youtubeService.find(id);
        });
    }

    getSrc() {
        const url = 'https://www.youtube.com/embed/XLbOWqjmj4Q' + this.song.url;
        console.log(url);
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
