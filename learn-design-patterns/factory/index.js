CoordinateSystem = {
    CARTESIAN: 0,
    POLAR: 1
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // constructor(a, b, cs=CoordinateSystem.CARTESIAN)
    // {
    //   switch (cs)
    //   {
    //     case CoordinateSystem.CARTESIAN:
    //       this.x = a;
    //       this.y = b;
    //       break;
    //     case CoordinateSystem.POLAR:
    //       this.x = a * Math.cos(b);
    //       this.y = a * Math.sin(b);
    //       break;
    //   }
    //
    //   // steps to add a new system
    //   // 1. augment CoordinateSystem
    //   // 2. change ctor
    // }

    static get factory() {
        return new PointFactory();
    }
}

class PointFactory {
    newCartesianPoint(x, y) {
        return new Point(x, y);
    }

    newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

let p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
console.log(p1);

// To implement Open/Close principle, we need to use Factory Pattern

// Point → PointFactory
let p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log(p2);

let p3 = Point.factory.newCartesianPoint(2, 3);
console.log(p3);