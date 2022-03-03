import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  vueloForm !: FormGroup;
  acctionBtn : string = "Consultar"

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private dialogref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.vueloForm = this.formBuilder.group({
      origen : ['', Validators.required],
      destino : ['', Validators.required],
      boleto : ['', Validators.required],
      fechaSalida : ['', Validators.required],
      fechavuelta : ['', Validators.required],
    })

    if(this.editData){
      this.acctionBtn = "Update";
      this.vueloForm.controls['origen'].setValue(this.editData.productName);
      this.vueloForm.controls['destino'].setValue(this.editData.category);
      this.vueloForm.controls['boleto '].setValue(this.editData.freshness);
      this.vueloForm.controls['fechaSalida'].setValue(this.editData.price);
      this.vueloForm.controls['fechavuelta'].setValue(this.editData.comment);
    }
  }

  addProduct (){
    if(!this.editData){
      if(this.vueloForm.valid){
        this.api.postProduct(this.vueloForm.value)
        .subscribe({
          next: (res)=> {
            alert("Product added succesfuly")
            this.vueloForm.reset();
            this.dialogref.close("Consultar");
          },
          error:()=>{
            alert("Warning adding product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.vueloForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product update successfully");
        this.vueloForm.reset();
        this.dialogref.close("update");
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })
  }

}
