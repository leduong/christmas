"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log = (d) => {
    process.stdout.write(d.toString());
};
class Parking {
    constructor(numberOfSlot, free) {
        free = free || "free";
        this.slots = new Array(numberOfSlot).fill(free);
        this.free = free;
    }
    findFirstFree() {
        const idx = this.slots.findIndex((x) => x === this.free);
        return idx;
    }
    findByName(name) {
        const idx = this.slots.findIndex((x) => x === name);
        return idx;
    }
    park(name) {
        const idx = this.findFirstFree();
        if (idx > -1 && idx < this.slots.length) {
            this.slots[idx] = name;
            return true;
        }
        return false;
    }
    leave(name, hours) {
        let result = [false];
        const idx = this.findByName(name);
        if (idx > -1 && idx < this.slots.length) {
            this.slots[idx] = this.free;
            result = [true, name, (idx + 1), this.price(hours)];
        }
        return result;
    }
    statusIsFree() {
        const results = this.slots.filter((x) => x === this.free);
        return results;
    }
    statusNotFree() {
        const results = this.slots.filter((x) => x !== this.free);
        return results;
    }
    status() {
        return this.slots;
    }
    toString() {
        return this.status().join("\n");
    }
    price(hours) {
        let totalcost = 0;
        if (hours > 0) {
            totalcost = hours > 2 ? 10 + 10 * (hours - 2) : 10;
        }
        return totalcost;
    }
    print() {
        console.log(this.toString());
    }
}
exports.Parking = Parking;
//# sourceMappingURL=parking.js.map