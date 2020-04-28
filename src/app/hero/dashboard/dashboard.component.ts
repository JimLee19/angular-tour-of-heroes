import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
import { TabDecorator } from '../../_decorators/tab-component.decorator';
import imageCompression from '../../common/browser-image-compression';
import { moneyToUpper } from '../../common/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModelField } from '../../_models/model-field';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@TabDecorator({ name: 'dashboard', path: 'dashboard' })
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  money: number;
  main: ModelField[];
  tcl: ModelField[];
  data: any;
  constructor(private heroService: HeroService,
    private deviceService: DeviceDetectorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getHeroes();
    this.data = { testName: '345', Tcl: [{ name: '', power: ['a'] }] };
    this.main = [
      { propertyName: 'testName', displayName: 'testName', controlType: 'text' },
    ];
    const expandContent = (data: any) => {
      return `${data['name']} ${data['alterEgo']}`;
    };
    this.tcl = [
      { propertyName: '_expand', displayName: 'expand', controlType: 'expand', show: 1, callback: expandContent },
      { propertyName: '_rowcheck', displayName: 'rowcheck', controlType: 'rowcheck', show: 1 },
      { propertyName: 'name', displayName: 'name', controlType: 'text', show: 1, defaultValue: 'sego' },
      { propertyName: 'power', displayName: 'power', controlType: 'dropdown', show: 1, Attrs: [{ key: 'mode', value: 'multiple' }] },
      { propertyName: 'alterEgo', displayName: 'alterEgo', controlType: 'text', show: 0, defaultValue: '23' },
      { propertyName: 'birthday', displayName: 'birthday', controlType: 'date', show: 1 },
    ];
    const deviceInfo = this.deviceService.getDeviceInfo();
    console.log(deviceInfo);

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  async handleImageUpload(event: any) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    } catch (error) {
      console.log(error);
    }
  }
  onSubmit(value: any) {
    console.log(this.data);
  }
}
