import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any
  closeResult: string = '';
  r_volt_status = 0
  r_load_status = 0
  r_mcb_status = 0
  r_pf_status = 0
  constructor(private http: HttpClient, private modalService: NgbModal, private offcanvasService: NgbOffcanvas) { }
  ngOnInit(): void {
    this.http.get("https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3").subscribe(vaue => {
      this.data = vaue;
    })
  }
  title = 'frontend-assignment';

  open(content: any, panel_name: String) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open1(content: any, name: String) {
    this.setDataInSideBar(name)
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
      },
    );
  }

  private getDismissReason1(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setDataInSideBar(value: String) {
    const valuuu = this.data.result.filter((v: { panel_name: String; }) => value === v.panel_name)
    console.log(valuuu[0]);
    
    this.r_volt_status = valuuu[0].r_volt_status
    this.r_load_status = valuuu[0].r_load_status
    this.r_mcb_status = valuuu[0].r_mcb_status
    this.r_pf_status = valuuu[0].r_pf_status
    console.log(this.r_pf_status);
    
  }

}
