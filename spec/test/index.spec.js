const { User } = require("../../index");

describe("Here I Test User class", function () {
  let user;
  let product1;
  let product2;
  beforeEach(function () {
    user = new User("ali", 2323);
    product1 = { name: "pepsi", price: 25 };
    product2 = { name: "cola", price: 40 };
  });

  describe("here i test addToCart", function () {
    it("should push product object to User cart", function () {
      user.addToCart(product1);
      expect(user.cart[0]).toEqual({ name: "pepsi", price: 25 });
      expect(user.cart[0].name).toBe("pepsi");
    });
  });

  describe("here i test calculateTotalCartPrice", function () {
    it("should return total price of User cart", function () {
      user.addToCart(product1);
      user.addToCart(product2);
      let totalPrice = user.calculateTotalCartPrice();
      expect(totalPrice).toBe(65);
    });
  });

  describe("here i test checkout Function", function () {
    let fakeObj;
    beforeEach(function () {
      fakeObj = jasmine.createSpyObj([
        "goToVerifyPage",
        "returnBack",
        "isVerify",
      ]);
    });
    // 1- paymentModel methods should be called
    it("check if paymentModel methods should be called", function () {
      user.checkout(fakeObj);
      expect(fakeObj.goToVerifyPage).toHaveBeenCalled();
      expect(fakeObj.returnBack).toHaveBeenCalled();
      expect(fakeObj.isVerify).toHaveBeenCalledTimes(1);
    });
    // 2- should retrun true if the payment is verified
    it("should retrun true if the payment is verified", function () {
      fakeObj.isVerify.and.returnValue(true);
      let returnedString = user.checkout(fakeObj);
      expect(returnedString).toBe(true);
    });
  });
});
