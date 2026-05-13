import { EstimateRequestBuilder } from "../builders/estimate-request.builder";
import { EstimateRequestData } from "../interfaces/estimate-request.interface";

export class EstimateRequestScenarios {
  validFullRequest(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .withReasons(["Safety", "Therapy"])
      .withPropertyType("Owned House / Condo")
      .withName("John Smith")
      .withEmail("john.smith.test@example.com")
      .withPhone("(313) 555-0198")
      .build();
  }

  invalidZipSixDigits(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("104000")
      .build();
  }

  validZipFiveDigits(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .build();
  }

  validNameData(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .withReasons(["Safety"])
      .withPropertyType()
      .withName("John Smith")
      .withEmail("john.smith.test@example.com")
      .build();
  }

  singleLetterLastNameData(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .withReasons(["Safety"])
      .withPropertyType()
      .withName("Test B")
      .withEmail("john.smith.test@example.com")
      .build();
  }

  fakePhoneData(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .withReasons(["Safety"])
      .withPropertyType()
      .withName("John Smith")
      .withEmail("john.smith.test@example.com")
      .withPhone("(888)888-8888")
      .build();
  }

  stepCounterFlowData(): EstimateRequestData {
    return new EstimateRequestBuilder()
      .withZip("10400")
      .withReasons(["Safety"])
      .withPropertyType("Owned House / Condo")
      .withName("John Smith")
      .withEmail("john.smith.test@example.com")
      .build();
  }
}
