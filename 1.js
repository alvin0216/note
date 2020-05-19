function EmployeeType(afullName, aAddress, aYearsWorked) {
  this.afullName = afullName
  this.aAddress = aAddress
  this.aYearsWorked = aYearsWorked

  this.salaryList = []
  this.avg = 0

  this.updateSalary = function (money) {
    this.salaryList.push(money)
  }

  this.averageSalary = function () {
    var sum = this.salaryList.reduce((sum, item) => {
      sum += item
      return sum
    })

    this.avg = sum / this.aYearsWorked
    return this.avg
  }

  this.dispaly = function () {
    console.log(this.afullName, this.aAddress, this.aYearsWorked, this.averageSalary)
  }
}

var p1 = new EmployeeType('张三', '北京', 3)

p1.updateSalary(1000)
p1.updateSalary(2000)
p1.updateSalary(3000)

console.log(p1.averageSalary())

p1.dispaly()