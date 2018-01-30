import update from '../../../elasticsearch/sync/update';

it('should send a batch update', async () => {
  const elasticClient = { bulk: jest.fn() };
  elasticClient.bulk.mockReturnValue(Promise.resolve({}));

  const rabbitChannel = { ack: jest.fn() };

  const msg = {
    content: Buffer.from(JSON.stringify({ userID: '1', name: 'Jacob' })),
  };

  const updates = [msg];

  const rest = await update(elasticClient, rabbitChannel, updates);
  expect(rest).toEqual([]);
  expect(elasticClient.bulk.mock.calls.length).toBe(1);
  expect(rabbitChannel.ack.mock.calls.length).toBe(1);
  expect(rabbitChannel.ack.mock.calls[0][0]).toEqual(msg);
  expect(rabbitChannel.ack.mock.calls[0][1]).toBe(true);
});

it('should handle an elasticsearch error correctly', async () => {
  const elasticClient = { bulk: jest.fn() };
  elasticClient.bulk.mockReturnValue(Promise.reject());

  const rabbitChannel = { nack: jest.fn() };

  const msg = {
    content: Buffer.from(JSON.stringify({ userID: '1', name: 'Jacob' })),
  };

  const updates = [msg];

  const rest = await update(elasticClient, rabbitChannel, updates);
  expect(rest).toBe(updates);
  expect(elasticClient.bulk.mock.calls.length).toBe(1);
  expect(rabbitChannel.nack.mock.calls.length).toBe(1);
  expect(rabbitChannel.nack.mock.calls[0][0]).toEqual(msg);
  expect(rabbitChannel.nack.mock.calls[0][1]).toBe(true);
});

it("shouldn't do api calls if updates is empty", async () => {
  const elasticClient = { bulk: jest.fn() };

  const rabbitChannel = { ack: jest.fn() };

  const rest = await update(elasticClient, rabbitChannel, []);
  expect(rest).toEqual([]);
  expect(elasticClient.bulk.mock.calls.length).toBe(0);
  expect(rabbitChannel.ack.mock.calls.length).toBe(0);
});

it("shouldn't handle messages added after it's been called", async () => {
  const msg = {
    content: Buffer.from(JSON.stringify({ userID: '1', name: 'Jacob' })),
  };

  const updates = [msg];
  // We do a little trick here, so in our mock function, we add another message
  // to the updates list.
  const elasticClient = {
    bulk: jest.fn(() => {
      updates.unshift({
        content: Buffer.from(JSON.stringify({ userID: '1', name: 'Jacob' })),
      });
      return Promise.resolve({});
    }),
  };

  const rabbitChannel = { ack: jest.fn() };

  const rest = await update(elasticClient, rabbitChannel, updates);
  expect(rest.length).toBe(1);
  expect(elasticClient.bulk.mock.calls.length).toBe(1);
  expect(rabbitChannel.ack.mock.calls.length).toBe(1);
  expect(rabbitChannel.ack.mock.calls[0][0]).toEqual(msg);
  expect(rabbitChannel.ack.mock.calls[0][1]).toBe(true);
});
