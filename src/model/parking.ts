"use strict";
console.log = (d: any) => {
    process.stdout.write(d.toString());
};
class Parking {
    public slots: any[];
    public free: string;
    constructor(numberOfSlot: number, free: string) {
        free = free || "free";
        this.slots = new Array(numberOfSlot).fill(free);
        this.free = free;
    }

    public findFirstFree() {
        const idx = this.slots.findIndex((x) => x === this.free);
        return idx;
    }

    public findByName(name: string) {
        const idx = this.slots.findIndex((x) => x === name);
        return idx;
    }

    public park(name: string) {
        const idx = this.findFirstFree();
        if (idx > -1 && idx < this.slots.length) {
            this.slots[idx] = name;
            return true;
        }
        return false;
    }

    public leave(name: string, hours: number) {
        let result: any[] = [false];
        const idx = this.findByName(name);
        if (idx > -1 && idx < this.slots.length) {
            this.slots[idx] = this.free;
            result = [true, name, (idx + 1), this.price(hours)];
        }
        return result;
    }

    public statusIsFree() {
        const results = this.slots.filter((x) => x === this.free);
        return results;
    }

    public statusNotFree() {
        const results = this.slots.filter((x) => x !== this.free);
        return results;
    }

    public status() {
        return this.slots;
    }

    public toString() {
        return this.status().join("\n");
    }

    public price(hours: number) {
        let totalcost = 0;
        if (hours > 0) {
            totalcost = hours > 2 ? 10 + 10 * (hours - 2) : 10;
        }
        return totalcost;
    }

    public print() {
        console.log(this.toString());
    }
}

export { Parking };
