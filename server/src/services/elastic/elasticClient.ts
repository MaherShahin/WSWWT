import { Client } from '@elastic/elasticsearch';
import config from "config"

const ELASTICSEARCH_HOST = config.get<string>('elasticsearch.host') || 'http://localhost:9200';

const esClient = new Client({ node: ELASTICSEARCH_HOST, requestTimeout: 30000 });

console.log(ELASTICSEARCH_HOST);

export default esClient;

