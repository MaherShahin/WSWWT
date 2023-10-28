import { Client } from '@elastic/elasticsearch';

const esClient =  new Client({ node: 'http://localhost:9200', requestTimeout: 30000 });

export default esClient;

