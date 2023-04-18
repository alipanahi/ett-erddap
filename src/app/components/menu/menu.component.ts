import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { PlotService } from '../plot/plot.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  form: FormGroup;
  public list:any = [
      {id:'time',name:'time (Date, UTC)'},
      {id:'Direzione_prevalente',name:'Direzione_prevalente (cardinal)'},
      {id:'Fluoropore_Conc',name:'Fluoropore_Conc (Fluoropore Concentration, µg/m3)'},
      {id:'Precipitazione_cumulata',name:'Precipitazione_cumulata (mm)'},
      {id:'OC_percentage',name:'OC_percentage (%)'},
      {id:'EC_percentage',name:'EC_percentage (%)'},
      {id:'Levo_percentage',name:'Levo_percentage (%)'},
      {id:'NO3_percentage',name:'NO3_percentage (%)'},
      {id:'SO4_percentage',name:'SO4_percentage (%)'},
      {id:'NH4_percentage',name:'NH4_percentage (%)'},
      {id:'Na_percentage',name:'Na_percentage (%)'},
      {id:'Mg_percentage',name:'Mg_percentage (%)'},
      {id:'Cl_percentage',name:'Cl_percentage (%)'},
      {id:'K_percentage',name:'K_percentage (%)'},
      {id:'Ca_percentage',name:'Ca_percentage (%)'},
      {id:'Fe_percentage',name:'Fe_percentage (%)'},
      {id:'Metalli_percentage',name:'Metalli_percentage (Metals_percentage, %)'}
  ]
  constructor(private fb: FormBuilder,private PlotService: PlotService) { 
    this.form = fb.group({
      selected:  new FormArray([])
     });
  }
  onCheckboxChange(event:any) {
    const selected = (this.form.controls['selected'] as FormArray);
    if (event.target.checked) {
      selected.push(new FormControl(event.target.value));
    } else {
      const index = selected.controls
      .findIndex(x => x.value === event.target.value);
      selected.removeAt(index);
    }
  }
     
  submit(){
    let params = this.form.value.selected
    let url = 'https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?'
    params.forEach((item:any,index:Number)=>{
      if(index==0){
        url+=item
      }else{
        url+=`%2C`+item
      }
    })
    this.PlotService.getData(url).subscribe(data => {
      console.log(data)
    })
  }
}
