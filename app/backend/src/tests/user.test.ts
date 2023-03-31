import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/User";
import mock from "./mocks/userMock";

chai.use(chaiHttp);

const { expect } = chai;

describe("rota de users", () => {
  describe("Ao fazer login", () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(mock.login as User);
    });
    afterEach(async () => sinon.restore());

    it("Verifica se é retornado token ao fazer login com sucesso", async () => {
      const response = await chai.request(app).post("/login").send(mock.user);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("token");
    });
  });

  describe("Em caso de erro", async () => {
    describe("Caso não exista usuário com o email enviado", async () => {
      beforeEach(() => sinon.stub(User, "findOne").resolves(null));
      afterEach(async () => sinon.restore());

      it("Deve retornar erro", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(mock.invalidUser);

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: "Invalid email or password",
        });
      });
    });
  });
});
