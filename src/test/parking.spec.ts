import * as assert from "assert";
import { Parking } from "../model/parking";
const parkingModel = Parking;
let parking: any;

describe("parkingModel", () => {
  describe("init parking", () => {
    it("should return true if the parking lot has 6 spaces", () => {
      parking = new parkingModel(6, "free");
      // var isValid = parkking.status() === Array(6).fill('free');
      assert.equal(
        parking.status().join(","),
        Array(6)
          .fill("free")
          .join(",")
      );
    });
  });
});

describe("park active", () => {
  beforeEach(() => {
    parking = new parkingModel(6, "free");
  });
  describe("park KA-01-HH-1234", () => {
    it("should return true if KA-01-HH-1234 is first", () => {
      parking.park("KA-01-HH-1234");
      const isValid = parking.status()[0] === "KA-01-HH-1234";
      assert.equal(isValid, true);
    });
    it("should return true if KA-01-HH-1234 is first of statusParking", () => {
      parking.park("KA-01-HH-1234");
      const statusParking = ["KA-01-HH-1234", "free", "free", "free", "free", "free"];
      const isValid = parking.status().join(",") === statusParking.join(",");
      assert.equal(isValid, true);
    });
    it("should return true if has 5 free slots", () => {
      parking.park("KA-01-HH-1234");
      const isValid =
        parking.statusIsFree().join(",") ===
        Array(5)
          .fill("free")
          .join(",");
      assert.equal(isValid, true);
    });
  });

  describe("park KA-01-HH-1234, park KA-01-HH-9999", () => {
    it("should return true if KA-01-HH-9999 is slot #2", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      const isValid = parking.status()[1] === "KA-01-HH-9999";
      assert.equal(isValid, true);
    });
    it("should return true if KA-01-HH-1234 KA-01-HH-9999 in statusParking", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      const statusParking = ["KA-01-HH-1234", "KA-01-HH-9999", "free", "free", "free", "free"];
      const isValid = parking.status().join(",") === statusParking.join(",");
      assert.equal(isValid, true);
    });
    it("should return true if has 4 free slots", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      const isValid =
        parking.statusIsFree().join(",") ===
        Array(4)
          .fill("free")
          .join(",");
      assert.equal(isValid, true);
    });
  });

  describe(`park KA-01-HH-1234
    park KA-01-HH-9999
    park KA-01-BB-0001
    park KA-01-HH-7777
    park KA-01-HH-2701
    park KA-01-HH-3141
    leave KA-01-HH-3141 4`, () => {
    it("should return true if slot #6 is free", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      parking.leave("KA-01-HH-3141", 4);
      const statusParking = [
        "KA-01-HH-1234",
        "KA-01-HH-9999",
        "KA-01-BB-0001",
        "KA-01-HH-7777",
        "KA-01-HH-2701",
        "free"
      ];
      const isValid = parking.status().join(",") === statusParking.join(",");
      assert.equal(isValid, true);
    });
    it("should return true if parking is full", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      const isValid = parking.statusIsFree().join(",") === [].join(",");
      assert.equal(isValid, true);
    });
    it("should return true if KA-01-BB-0001 is park slot #3", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      const isValid = parking.status()[2] === "KA-01-BB-0001";
      assert.equal(isValid, true);
    });

    it("should return true if KA-01-HH-7777 is park slot #4", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      const isValid = parking.status()[3] === "KA-01-HH-7777";
      assert.equal(isValid, true);
    });

    it("should return true if KA-01-HH-2701 is park slot #5", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      const isValid = parking.status()[4] === "KA-01-HH-2701";
      assert.equal(isValid, true);
    });

    it("should return true if KA-01-HH-3141 is park slot #6", () => {
      parking.park("KA-01-HH-1234");
      parking.park("KA-01-HH-9999");
      parking.park("KA-01-BB-0001");
      parking.park("KA-01-HH-7777");
      parking.park("KA-01-HH-2701");
      parking.park("KA-01-HH-3141");
      const isValid = parking.status()[5] === "KA-01-HH-3141";
      assert.equal(isValid, true);
    });
  });

  describe(`park KA-01-HH-1234
    park KA-01-HH-1234
    park KA-01-HH-9999
    park KA-01-BB-0001
    park KA-01-HH-7777
    park KA-01-HH-2701
    park KA-01-HH-3141
    leave KA-01-HH-3141 4
    park KA-01-P-333
    park DL-12-AA-9999
    leave KA-01-HH-1234 4
    leave KA-01-BB-0001 6
    leave DL-12-AA-9999 2
    park KA-09-HH-0987
    park CA-09-IO-1111
    park KA-09-HH-0123`, () => {
    it("Check all", () => {
      const inputTxt = `park KA-01-HH-1234
                            park KA-01-HH-9999
                            park KA-01-BB-0001
                            park KA-01-HH-7777
                            park KA-01-HH-2701
                            park KA-01-HH-3141
                            leave KA-01-HH-3141 4
                            park KA-01-P-333
                            park DL-12-AA-9999
                            leave KA-01-HH-1234 4
                            leave KA-01-BB-0001 6
                            leave DL-12-AA-9999 2
                            park KA-09-HH-0987
                            park CA-09-IO-1111
                            park KA-09-HH-0123`;
      const parkLeave = inputTxt.split("\n").map((x) => x.trim());
      parkLeave.forEach((car) => {
        const carAction = car.split(" ");
        switch (carAction[0]) {
          case "park":
            parking.park(carAction[1]);
            break;

          case "leave":
            parking.leave(carAction[1], carAction[2]);
            break;

          default:
            break;
        }
      });
      const statusParking = [
        "KA-09-HH-0987",
        "KA-01-HH-9999",
        "CA-09-IO-1111",
        "KA-01-HH-7777",
        "KA-01-HH-2701",
        "KA-01-P-333"
      ];
      const isValid = parking.status().join(",") === statusParking.join(",");
      assert.equal(isValid, true);
    });
  });
});
