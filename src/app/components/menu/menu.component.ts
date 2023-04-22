import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  form: FormGroup;
  graph:any;
  public selectedItems:Array<any>=[]

  public list:any = [
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
      {id:'Metalli_percentage',name:'Metalli_percentage (Metals_percentage, %)'},
      {id:'OC',name:'OC (µg/m3)'},
      {id:'EC',name:'EC (µg/m3)'},
      {id:'Levo',name:'LEVO (µg/m3)'},
      {id:'NO3',name:'NO3 (NO3-, µg/m3)'},
      {id:'SO42',name:'SO42 (SO42-, µg/m3)'},
      {id:'NH4',name:'NH4 (NH4+, µg/m3)'},
      {id:'Na',name:'Na (µg/m3)'},
      {id:'Mg',name:'Mg (µg/m3)'},
      {id:'Al',name:'Al (µg/m3)'},
      {id:'Si',name:'Si (µg/m3)'},
      {id:'S',name:'S (µg/m3)'},
      {id:'Cl',name:'Cl (µg/m3)'},
      {id:'K',name:'K (µg/m3)'},
      {id:'Ca',name:'Ca (µg/m3)'},
      {id:'Ti',name:'Ti (µg/m3)'},
      {id:'V',name:'V (µg/m3)'},
      {id:'Cr',name:'Cr (µg/m3)'},
      {id:'Mn',name:'Mn (µg/m3)'},
      {id:'Fe',name:'Fe (µg/m3)'},
      {id:'Ni',name:'Ni (µg/m3)'},
      {id:'Cu',name:'Cu (µg/m3)'},
      {id:'Zn',name:'Zn (µg/m3)'},
      {id:'As',name:'As (µg/m3)'},
  ]
  constructor(private fb: FormBuilder,private _router: Router) { 
    this.form = fb.group({
      selected:  new FormArray([]),
      graph:'column'
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
  checkAll(e:any){
    let selected = (this.form.controls['selected'] as FormArray);
    if (e.target.checked) {
      
      this.list.forEach((item:any)=>{
        this.selectedItems.push(item.id)
        selected.push(new FormControl(item.id));
      })
    }else{
      this.selectedItems=[]
      selected.clear()
    }
  } 
  submit(){
    this.graph=this.form.get('graph')?.value;
    //console.log(this.graph)
    let params = this.form.value.selected
    this._router.navigateByUrl('/menu-graph', { state: {data: params,graph:this.graph } });
  }
  ngOnInit(): void {
    //console.log(history.state.data)
    if(history.state.data){
      this.selectedItems = history.state.data
      const selected = (this.form.controls['selected'] as FormArray);
      this.selectedItems.forEach((item:any)=>{
        selected.push(new FormControl(item));
      })
    }
    document.getElementById('switch_btn')!.innerHTML="Go to main page"
  }
}
