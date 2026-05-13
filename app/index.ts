import { PageHolder } from "./abstractClasses";
import { ZipStep } from "./page/zip.step";
import { ReasonsStep } from "./page/reasons.step";
import { PropertyTypeStep } from "./page/propertyType.step";
import { NameEmailStep } from "./page/nameEmail.step";
import { PhoneStep } from "./page/phone.step";
import { ThankYouPage } from "./page/thankYou.page";
import { StepProgress } from "./component/stepProgress.component";
import { EstimateRequestData } from "../test-data/interfaces/estimate-request.interface";

export class Application extends PageHolder {
  public zip = new ZipStep(this.page);
  public reasons = new ReasonsStep(this.page);
  public propertyType = new PropertyTypeStep(this.page);
  public nameEmail = new NameEmailStep(this.page);
  public phone = new PhoneStep(this.page);
  public thankYou = new ThankYouPage(this.page);
  public stepProgress = new StepProgress(this.page);

  async openHomePage() {
    await this.page.goto("/");
  }

  async submitZipStep(zip: string) {
    await this.zip.enterZip(zip);
    await this.zip.clickNext();
  }

  async submitReasonsStep(reasons: string[]) {
    await this.reasons.selectReasons(reasons);
    await this.reasons.clickNext();
  }

  async submitPropertyTypeStep(type: string) {
    await this.propertyType.selectPropertyType(type);
    await this.propertyType.clickNext();
  }

  async submitNameEmailStep(name: string, email: string) {
    await this.nameEmail.enterName(name);
    await this.nameEmail.enterEmail(email);
    await this.nameEmail.clickGoToEstimate();
  }

  async submitPhoneStep(phone: string) {
    await this.phone.enterPhone(phone);
    await this.phone.clickSubmit();
  }

  async navigateToPhoneStep(data: EstimateRequestData) {
    await this.openHomePage();
    await this.submitZipStep(data.zip);
    await this.submitReasonsStep(data.reasons);
    await this.submitPropertyTypeStep(data.propertyType);
    await this.submitNameEmailStep(data.name, data.email);
  }
}
