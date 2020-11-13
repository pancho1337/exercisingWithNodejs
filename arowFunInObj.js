console.log("running")

const fs = require('fs')

fs.writeFileSync('./hello.txt', "hello brah")

const testObj = {
    name: "panchoDelRancho",
    globalExecuationContext: () => {
        console.log("hello from global " + this.name)
    },
    objExecutionContext1() {
        console.log("hello obj " + this.name)
    },
    objExecutionContext2: function () {
        console.log("hello obj " + this.name)
    }
}
testObj.globalExecuationContext()
testObj.objExecutionContext1()
testObj.objExecutionContext2()


console.log("done")