import client from './client';

export const indexData = async (indexName: string, data: any) => {
  await client.index({
    index: indexName,
    body: data,
  });
};
