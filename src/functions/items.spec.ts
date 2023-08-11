import { assert as sinonAssert, spy, stub } from 'sinon';
import { DataSource } from 'typeorm';
import { assert, expect } from 'chai';

import * as datasource from '../shared/db-datasource';
import { handler } from './items';


const mockEvent = ({
  method, originalUrl, path, query, body
}) => ({
  httpMethod: method,
  rawUrl: originalUrl,
  rawQuery: '',
  path: path,
  headers: {},
  multiValueHeaders: {},
  queryStringParameters: <any>query || null,
  multiValueQueryStringParameters: null,
  body: body ? JSON.stringify(body) : undefined,
  isBase64Encoded: true
})

const mockResponse = [
  { id: 'mock-id-1', itemName: 'mock-item-1', completed: true },
  { id: 'mock-id-2', itemName: 'mock-item-2', completed: false }
];

describe('Test items function', () => {
  let dataSourceStub;
  const findByStub = stub();
  const saveStub = stub();
  const findOneByStub = stub();
  const deleteStub = stub();

  beforeEach(() => {
    dataSourceStub = stub(datasource, 'getDataSourceAsync').resolves({
      getRepository: stub().returns({
        findBy: findByStub,
        createQueryBuilder: stub().returns({
          orderBy: stub().returns({
            getMany: stub().returns(mockResponse)
          }),
          delete: deleteStub.returns({
            from: stub().returns({
              where: stub().returns({
                execute: stub()
              })
            })
          })
        }),
        save: saveStub,
        findOneBy: findOneByStub.returns({ completed: true })
      })
    } as unknown as DataSource)
  });

  afterEach(() => {
    dataSourceStub.restore();

    findByStub.reset();
    saveStub.reset();
    findOneByStub.reset();
    deleteStub.reset();
  });


  describe('Get items', () => {
    it('should able to get full item list', async () => {
      const result = await handler(
        mockEvent({
          method: 'GET',
          originalUrl: '/',
          path: '/',
          query: { search: '' },
          body: ''
        }),
        null
      );

      const { data } = JSON.parse((result as any).body);

      expect(data).to.deep.equal(mockResponse);
    })

    it('should trigger the like query', async () => {
      await handler(
        mockEvent({
          method: 'GET',
          originalUrl: '/',
          path: '/',
          query: { search: 'testing' },
          body: ''
        }),
        null
      );

      expect(findByStub.calledOnce).to.be.equal(true);
    })
  });

  describe('Add item', () => {
    it('should call save once', async () => {
      await handler(
        mockEvent({
          method: 'POST',
          originalUrl: '/',
          path: '/',
          query: { search: '' },
          body: { itemName: 'mock-item-3' }
        }),
        null
      );

      expect(saveStub.calledOnce).to.be.equal(true);
    })

    it('should NOT call save once', async () => {
      await handler(
        mockEvent({
          method: 'POST',
          originalUrl: '/',
          path: '/',
          query: { search: '' },
          body: { itemName: '' }
        }),
        null
      );

      expect(saveStub.calledOnce).to.be.equal(false);
    })
  });

  describe('Update item', () => {
    it('should called save and findOneBy once', async () => {
      const result = await handler(
        mockEvent({
          method: 'PUT',
          originalUrl: '/',
          path: '/',
          query: { search: '' },
          body: { id: 'mock-id-3', checked: false }
        }),
        null
      );

      expect(saveStub.calledOnce).to.be.equal(true);
      expect(findOneByStub.calledOnce).to.be.equal(true);
    })
  });

  describe('Delete items', () => {
    it('should called delete once', async () => {
      const result = await handler(
        mockEvent({
          method: 'DELETE',
          originalUrl: '/',
          path: '/',
          query: { search: '' },
          body: ''
        }),
        null
      );

      expect(deleteStub.calledOnce).to.be.equal(true);
    })
  });
})