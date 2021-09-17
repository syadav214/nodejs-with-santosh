const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const getProperties = (_index) => {
  return new Promise((resolve, reject) => {
    client.indices
      .getMapping({
        index: _index,
      })
      .then((resp) => {
        let properties = undefined;
        if (resp && resp.body && resp.body.hasOwnProperty(_index)) {
          if (resp && resp.body && resp.body.hasOwnProperty(_index)) {
            const indexMapping = resp.body[_index];
            if (
              indexMapping &&
              indexMapping.mappings &&
              indexMapping.mappings.properties
            ) {
              properties = indexMapping.mappings.properties;
            }
          }
        }
        resolve(properties);
      })
      .catch((e) => reject(e));
  });
};

module.exports = async (_index, phrase) => {
  const hits = [];
  const properties = await getProperties(_index);
  if (properties !== undefined) {
    for (let field in properties) {
      const searchResult = await client.search({
        index: _index,
        body: {
          query: {
            match_phrase_prefix: {
              [field]: phrase,
            },
          },
        },
      }).catch(e=> console.log('errr', field, properties[field]));

      if (
        searchResult &&
        searchResult.body &&
        searchResult.body.hits &&
        searchResult.body.hits.hits &&
        searchResult.body.hits.hits.length > 0
      ) {
        hits.push(...searchResult.body.hits.hits);
      }
    }
  }

  /*const searchResultFirstName = await client.search({
    index: _index,
    body: {
      query: {
        match_phrase_prefix: {
          firstname: phrase,
        },
      },
    },
  });

  if (
    searchResultFirstName &&
    searchResultFirstName.body &&
    searchResultFirstName.body.hits &&
    searchResultFirstName.body.hits.hits &&
    searchResultFirstName.body.hits.hits.length > 0
  ) {
    hits.push(...searchResultFirstName.body.hits.hits);
  }*/

  return {
    hitsCount: hits.length,
    hits,
  };
};
