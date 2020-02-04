import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [InitiateProviderService]
})
export class ProductDetailsComponent implements OnInit {



  @Input() QuoteID: string;
  @Input() CompanyName: string;
  @Input() ShowGrid: string;


  displayedColumns: string[] = ['ProductCode', 'ProductDescription', 'Actions'];

  public quoteLineID = 0;
  public productResults = [];
  private _lineData = [];
  public selectedPart = "";
  public selectedUOM = "";
  public selectedContainerType = "";
  public selectedCurrency = "";

  public showProductDetails: boolean = false;

  private _data;



  public pricingGroup: FormGroup;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {


    let disableColumns = false;

    if (this.ShowGrid == 'no')
      disableColumns = true;


    this.pricingGroup = fb.group({
      PartID: [{ value: '', disabled: disableColumns }, [Validators.required]],
      PartName: [{ value: '', disabled: disableColumns }, [Validators.required]],
      UnitOfMeasure: [{ value: '', disabled: disableColumns }, [Validators.required]],
      AnnualVolume: [{ value: '', disabled: disableColumns }, [Validators.required]],
      TypicalOrderSize: [{ value: '', disabled: disableColumns }, [Validators.required]],
      PackSize: [{ value: '', disabled: disableColumns }, [Validators.required]],
      ContainerType: [{ value: '', disabled: disableColumns }, [Validators.required]],
      TargetPrice: [{ value: '', disabled: disableColumns }, [Validators.required]],
      CurrencyOfTargetPrice: [{ value: '', disabled: disableColumns }],
      UsageLevel: [{ value: '', disabled: disableColumns }, [Validators.required]],
      NotesAndComment: [{ value: '', disabled: disableColumns }, [Validators.required]]
    });
  }


  public partList = [];
  public containerTypes = [];
  public currencyCodes = [];
  public uomList = [];

  ngOnInit() {


    var delayedLoad = 5000;//Max load time for list

    if (this.QuoteID != "" && this.CompanyName != "") {

      if (sessionStorage.getItem('parts_list_' + this.CompanyName) != null) {
        delayedLoad = 500;
        this.partList = JSON.parse(sessionStorage.getItem('parts_list_' + this.CompanyName));
      }
      else {
        delayedLoad = 5000;
        this.initiate.getPartList(this.CompanyName, "e.desc_long_stock").subscribe(ret => {

          ret.forEach(element => {
            this.partList.push({ id: element.id, name: element.name });
          });

          sessionStorage.setItem('parts_list_' + this.CompanyName, JSON.stringify(this.partList));

        });
      }


      this.initiate.getUnitOfMeasureList().subscribe(ret => {
        ret.forEach(element => {
          this.uomList.push({ id: element.id, name: element.name });
        })
      })

      this.initiate.getContainerTypeList().subscribe(ret => {
        ret.forEach(element => {
          this.containerTypes.push({ id: element.id, name: element.name });
        })
      })

      console.log(this.containerTypes);

      this.initiate.getCurrencyCodeList().subscribe(ret => {
        ret.forEach(element => {
          this.currencyCodes.push({ id: element.id, name: element.name });
        })
      });
      console.log(this.currencyCodes);


      //this.loadData(delayedLoad);
    }

    this.loadLinesGrid();


  }


  loadLinesGrid() {
    if (+this.QuoteID > 0) {
      this._lineData = [];
      this.initiate.getQuoteLines(this.QuoteID).subscribe(line => {
        line.forEach(element => {
          this._lineData.push({ ProductDescription: element.productDescription, ProductCode: element.productCode, lineID: element.quoteLineID });
        });

        this.productResults = this._lineData;
      })
    }
  }

  loadData(timeoutInterval) {
    this.initiate.getQuoteLine(this.quoteLineID).subscribe(ret => {
      this._data = ret;
      console.log(this._data);

      setTimeout(() => {

        this.selectedPart = this._data.productCode;

        this.pricingGroup.controls.PartID.setValue(this._data.productCode);

        if (this.showTextPartName()) {
          this.pricingGroup.controls.PartName.setValue(this._data.productDescription);
        }
        else {
          this.pricingGroup.controls.PartName.setValue(this._data.productCode);
        }

        if (this._data.containerTypeID) this.pricingGroup.controls['ContainerType'].setValue(this._data.containerTypeID.toString());
        if (this._data.unitOfMeasure) this.pricingGroup.controls['UnitOfMeasure'].setValue(this._data.unitOfMeasure.toString());

        if (this._data.targetCurrencyID) this.pricingGroup.controls['CurrencyOfTargetPrice'].setValue(this._data.targetCurrencyID.toString());
        if (this._data.annualVolume ! = null) this.pricingGroup.controls['AnnualVolume'].setValue(this._data.annualVolume.toString());

        if (this._data.typicalOrderSize != null) this.pricingGroup.controls['TypicalOrderSize'].setValue(this._data.typicalOrderSize.toString());
        if (this._data.packSize != null) this.pricingGroup.controls['PackSize'].setValue(this._data.packSize.toString());
        if (this._data.targetPrice != null) this.pricingGroup.controls['TargetPrice'].setValue(this._data.targetPrice.toString());
        if (this._data.usageLevel) this.pricingGroup.controls['UsageLevel'].setValue(this._data.usageLevel.toString());
        if (this._data.comments) this.pricingGroup.controls['NotesAndComment'].setValue(this._data.comments);
      }, timeoutInterval);
    });
  }

  gatherFieldData() {




    let data = {
      PartID: this.pricingGroup.value.PartID,
      PartName: this.pricingGroup.value.PartName,
      UnitOfMeasure: this.pricingGroup.value.UnitOfMeasure,
      AnnualVolume: this.pricingGroup.value.AnnualVolume,
      TypicalOrderSize: this.pricingGroup.value.TypicalOrderSize,
      PackSize: this.pricingGroup.value.PackSize,
      ContainerType: this.pricingGroup.value.ContainerType,
      TargetPrice: this.pricingGroup.value.TargetPrice,
      CurrencyOfTargetPrice: this.pricingGroup.value.CurrencyOfTargetPrice,
      UsageLevel: this.pricingGroup.value.UsageLevel,
      NotesAndComment: this.pricingGroup.value.NotesAndComment
    };

    if(!this.showTextPartName()){
      data.PartName = this.partList.filter(function (item) {
        return item.id == data.PartID;
      })[0].name;
    }

    return data;
  }

  part_change() {
    this.pricingGroup.controls.PartID.setValue(this.selectedPart);

    if(this.showTextPartName()){
      this.pricingGroup.controls.PartName.setValue('');
    }
    else{
      this.pricingGroup.controls.PartName.setValue(this.selectedPart);
    }

    this.initiate.getPart(this.selectedPart, this.CompanyName).subscribe(sub => {

      /*
      this.CompanyCode = companyCode;
            this.PartID = partID;
            this.ContainerType = containerType;
            this.PartName = partName;
            this.QuantityPackage = quantityPackage;
            this.UOM = uom;
            this.IsTestPart = isTestPart;

      */

      this.pricingGroup.controls.PackSize.setValue(sub.quantityPackage.toString());

      var containerid = this.containerTypes.filter(function (item) {
        return item.name == sub.containerType;
      })[0].id;

      this.pricingGroup.controls.ContainerType.setValue(containerid.toString());


      var uomID = this.uomList.filter(function (item) {
        return item.name.toLocaleLowerCase() == sub.uom.toLocaleLowerCase();
      })[0].name;


      //this.pricingGroup.controls['UnitOfMeasure'].setValue(this._data.unitOfMeasure.toString())
      this.pricingGroup.controls.UnitOfMeasure.setValue(uomID);


    });
  }

  cancel() {
    this.pricingGroup.reset();
    this.quoteLineID = 0;
    this.showProductDetails = false;
  }

  save($event) {

    if (this.pricingGroup.valid) {
      let data = this.gatherFieldData();

      this.initiate.saveQuoteLine(this.quoteLineID, this.QuoteID, data.PartID, data.PartName, data.UsageLevel, data.UnitOfMeasure, data.NotesAndComment, data.TargetPrice, data.CurrencyOfTargetPrice, data.AnnualVolume, data.TypicalOrderSize, data.PackSize, data.ContainerType)
        .subscribe(sub => {
          this.pricingGroup.reset();
          this.quoteLineID = 0;
          this.showProductDetails = false;
          this.loadLinesGrid();
        })

      $event.preventDefault();



      /*

      line.AnnualVolume,
      line.TypicalOrderSize, 
        line.PackSize, 
      line.ContainerTypeID,
      line.TargetPrice, 
      line.TargetCurrencyID, 
      line.isTestPart

      */
      //this.initiate.saveProductDetails(data);      
    }

  }



  lineEdit(e) {
    this.pricingGroup.reset();
    this.quoteLineID = e;
    this.showProductDetails = true;

    this.loadData(500);
  }

  lineDelete(e) {
    this.initiate.deleteQuoteLine(e).subscribe(sub => {
      this.pricingGroup.reset();
      this.loadLinesGrid();
    });
  }



  showTextPartName() {
    if (this.selectedPart.indexOf('RDBAKERY') > 0 ||
      this.selectedPart.indexOf('RDNUTRITION') > 0 ||
      this.selectedPart.indexOf('RDSWEET') > 0 ||
      this.selectedPart.indexOf('RDSAVOURY') > 0
    ) {
      return true;
    }
    else {
      return false;
    }
  }

}

