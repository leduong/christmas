"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const parking_1 = require("./model/parking");
const output = [];
const slotFree = "free";
const parkingModel = parking_1.Parking;
const argv = process.argv.slice(2);
console.log = (d) => {
    process.stdout.write(d.toString());
};
if (argv.length !== 2) {
    console.log("Parameter is invalid. \n Ex:  node ./bin/parking_lot input.txt output.txt");
    process.exit();
}
fs.readFile("./" + argv[0], "utf8", (err, data) => {
    if (err) {
        throw err;
    }
    const allcmd = data.split("\n");
    const createSlot = allcmd[0].split(" ");
    if (parseInt(createSlot[1], 10) > 0) {
        const CarPark = new parkingModel(parseInt(createSlot[1], 10), slotFree);
        allcmd.forEach((cmd) => {
            const params = cmd.split(" ");
            let parkingStatus;
            let statusNotFree;
            let statusIsFree;
            switch (params[0]) {
                case "create_parking_lot":
                    if (parseInt(createSlot[1], 10) > 0) {
                        output.push(`Created parking lot with ${params[1]} slots`);
                        parkingStatus = CarPark.status();
                        for (let idx = 0; idx < parkingStatus.length; idx++) {
                            const slot = idx + 1;
                            if (parkingStatus[idx] === slotFree) {
                                output.push(`Allocated slot number: ${slot}`);
                            }
                        }
                    }
                    else {
                        output.push("wrong syntax");
                    }
                    break;
                case "park":
                    if (!!params[1]) {
                        const parked = CarPark.park(params[1]);
                        if (!parked) {
                            output.push("Sorry, parking lot is full");
                        }
                    }
                    else {
                        output.push("wrong syntax");
                    }
                    break;
                case "leave":
                    if (!!params[1] && !!params[2]) {
                        const leaved = CarPark.leave(params[1], Number(params[2]));
                        if (!!leaved[0]) {
                            output.push(`Registration number ${leaved[1]} with Slot Number ${leaved[2]} is free with Charge ${leaved[3]}`);
                        }
                        else {
                            output.push(`Registration number ${params[1]} not found`);
                            parkingStatus = CarPark.status();
                            for (let idx = 0; idx < parkingStatus.length; idx++) {
                                const slot = idx + 1;
                                if (parkingStatus[idx] === slotFree) {
                                    output.push(`Allocated slot number: ${slot}`);
                                }
                            }
                        }
                    }
                    else {
                        output.push("wrong syntax");
                    }
                    break;
                case "status":
                    parkingStatus = CarPark.status();
                    statusNotFree = CarPark.statusNotFree();
                    statusIsFree = CarPark.statusIsFree();
                    if (statusNotFree && !!statusNotFree.length) {
                        output.push(`Slot No.Registration No.`);
                        for (let idx = 0; idx < parkingStatus.length; idx++) {
                            const slot = idx + 1;
                            if (parkingStatus[idx] !== slotFree) {
                                output.push(`${slot} ${parkingStatus[idx]}`);
                            }
                        }
                    }
                    if (statusIsFree && !!statusIsFree.length) {
                        for (let idx = 0; idx < parkingStatus.length; idx++) {
                            const slot = idx + 1;
                            if (parkingStatus[idx] === slotFree) {
                                output.push(`Allocated slot number: ${slot}`);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        });
        fs.writeFile("./" + argv[1], output.join("\n"), (error) => {
            if (error) {
                return console.log(error);
            }
            console.log("The file was saved!");
        });
    }
});
//# sourceMappingURL=parking_lot.js.map