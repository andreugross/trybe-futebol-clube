import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Match from "../database/models/Match";
import mock from "./mocks/matchMock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Rota de matches", () => {
  const { allMatches, matchesInProgress } = mock;

  describe("Ao buscar por todos os jogos", () => {
    beforeEach(async () => {
      sinon.stub(Match, "findAll").resolves(allMatches as unknown as Match[]);
    });
    afterEach(() => sinon.restore());

    it('Verifica se são retornados os dados corretamente', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(allMatches)
    })
  });

    describe("Ao buscar jogos em andamento", () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findAll').resolves(matchesInProgress as unknown as Match[]);
      })
      afterEach(() => sinon.restore());

      it('Verifica se são retornados os dados corretamente', async () => {
        const response = await chai.request(app).get('/matches').query({ inProgress: true });

        expect(response).to.be.status(200);
        expect(response.body).to.deep.equal(matchesInProgress)
      })
    })
});
