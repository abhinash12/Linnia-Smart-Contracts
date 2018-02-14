const LinniaHub = artifacts.require("./LinniaHub.sol")

import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"

contract("LinniaHub", (accounts) => {
  let instance
  beforeEach("deploy a new LinniaHub contract", async () => {
    instance = await LinniaHub.new()
  })

  describe("constructor", () => {
    it("should set admin correctly", async () => {
      const instance = await LinniaHub.new()
      assert.equal(await instance.owner(), accounts[0])
    })
    it("should initialize roles, hth, records addresss to zero",
      async () => {
        assert.equal(await instance.rolesContract(), 0)
        assert.equal(await instance.hthContract(), 0)
        assert.equal(await instance.recordsContract(), 0)
      })
  })
  describe("set Roles contract", () => {
    it("should allow admin to set Roles address", async () => {
      const tx = await instance.setRolesContract(42)
      assert.equal(tx.logs[0].args.from, 0)
      assert.equal(tx.logs[0].args.to, 42)
      assert.equal(await instance.rolesContract(), 42)
    })
    it("should not allow non-admin to set Roles address", async () => {
      await expectThrow(instance.setRolesContract(42, { from: accounts[1] }))
    })
  })
  describe("set HTH contract", () => {
    it("should allow admin to set HTH address", async () => {
      const tx = await instance.setHTHContract(42)
      assert.equal(tx.logs[0].args.from, 0)
      assert.equal(tx.logs[0].args.to, 42)
      assert.equal(await instance.hthContract(), 42)
    })
  })
  describe("set Records contract", () => {
    it("should allow admin to set Records address", async () => {
      const tx = await instance.setRecordsContract(42)
      assert.equal(tx.logs[0].args.from, 0)
      assert.equal(tx.logs[0].args.to, 42)
      assert.equal(await instance.recordsContract(), 42)
    })
  })
})
