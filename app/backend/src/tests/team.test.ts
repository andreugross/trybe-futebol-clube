import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import mock from './mocks/teamMock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de times', () => {
    describe('Ao buscar por todos os times', () => {
        beforeEach(() => {
            sinon.stub(Team, 'findAll').resolves(mock.mockteams as Team[]);
          });

        it('Verifica se retorna todos os times corretamente', async () => {
            const response = await chai.request(app).get('/teams').send(mock.mockteams);
            
            expect(response).to.have.status(200);
            expect(response.body).to.deep.equal(mock.mockteams);
        })
    })

    describe('Ao buscar um time pelo id', () => {
        beforeEach(() => {
            sinon.stub(Team, 'findOne').resolves(mock.mockteams[0] as Team);
          });

        it('Verifica se retorna todos os times corretamente', async () => {
            const response = await chai.request(app).get('/teams/1').send(mock.mockteams);
            
            expect(response).to.have.status(200);
            expect(response.body).to.deep.equal(mock.mockteams[0]);
        })
    })
})