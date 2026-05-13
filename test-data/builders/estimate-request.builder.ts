import { EstimateRequestData } from "../interfaces/estimate-request.interface";

const VALID_ZIPS = ["10400", "90210", "60614", "30301", "85001"];
const PROPERTY_TYPES = [
  "Owned House / Condo",
  "Rental Property",
  "Mobile Home",
] as const;

export class EstimateRequestBuilder {
  private data: Partial<EstimateRequestData> = {};

  withZip(zip?: string): this {
    this.data.zip = zip ?? VALID_ZIPS[Math.floor(Math.random() * VALID_ZIPS.length)];
    return this;
  }

  withReasons(reasons?: string[]): this {
    this.data.reasons = reasons ?? ["Safety"];
    return this;
  }

  withPropertyType(type?: string): this {
    this.data.propertyType = type ?? PROPERTY_TYPES[0];
    return this;
  }

  withName(name?: string): this {
    this.data.name = name ?? "John Smith";
    return this;
  }

  withEmail(email?: string): this {
    const uniqueSuffix = Date.now();
    this.data.email =
      email ?? `test+${uniqueSuffix}@example.com`;
    return this;
  }

  withPhone(phone?: string): this {
    this.data.phone = phone ?? "(313) 555-0198";
    return this;
  }

  build(): EstimateRequestData {
    return {
      zip: this.data.zip ?? VALID_ZIPS[0],
      reasons: this.data.reasons ?? ["Safety"],
      propertyType: this.data.propertyType ?? PROPERTY_TYPES[0],
      name: this.data.name ?? "John Smith",
      email: this.data.email ?? `test+${Date.now()}@example.com`,
      phone: this.data.phone ?? "(313) 555-0198",
    };
  }
}
