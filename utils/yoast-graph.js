// This is not pretty but it "works"
// We need to cleanup the yoast graph when rendering our front end
// urls are mapped wrong
// @ids are mapped wrong
// these utilites solves that for our yoast graph

function serializeContentUrl(url) {
  // Remove yoast bload
  let urlSerializer = url.replace(/global-forest-watch-blog/, '');

  // Cleanup cms urls
  urlSerializer = urlSerializer.replace(
    /https:\/\/content.globalforestwatch.org\//,
    'https://globalforestwatch.org/blog/'
  );
  urlSerializer = urlSerializer.replace(
    /https:\/\/www.globalforestwatch.org\/(blog)?\/?/,
    'https://globalforestwatch.org/blog/'
  );

  if (urlSerializer.endsWith('#breadcrumb')) {
    urlSerializer = urlSerializer.replace(/#breadcrumb/, '/#breadcrumb');
  }

  if (!urlSerializer.endsWith('#breadcrumb') && !urlSerializer.endsWith('/')) {
    urlSerializer = `${urlSerializer}/`;
  }
  return urlSerializer;
}

export default (metaTags) => {
  if (!metaTags) return null;
  const match = metaTags.match(
    /<script type="application\/ld\+json" .+>(.*?)<\/script>/
  );
  if (match && match[1]) {
    try {
      const parseGraph = JSON.parse(match[1]);
      const graph = {
        ...parseGraph,
        '@graph': [
          {
            '@type': 'Organization',
            name: 'Global Forest Watch',
            description:
              'Global Forest Watch offers free, real-time data, technology and tools for monitoring the world’s forests, enabling better protection against illegal deforestation and unsustainable practices.',
            image: 'https://www.globalforestwatch.org/assets/card-2.png',
            logo: 'https://www.globalforestwatch.org/assets/gfw.png',
            url: 'https://www.globalforestwatch.org/',
            telephone: '+12027297600',
            sameAs: [
              'https://twitter.com/globalforests',
              'https://www.facebook.com/globalforests/',
              'https://www.youtube.com/channel/UCAsamYre1KLulf4FD-xJfLA',
              'https://www.instagram.com/globalforests/',
              'https://en.wikipedia.org/wiki/Global_Forest_Watch',
              'https://www.wikidata.org/wiki/Q22677558',
              'https://www.crunchbase.com/organization/global-forest-watch',
              'https://www.wri.org/our-work/project/global-forest-watch, https://data.globalforestwatch.org/, https://pro.globalforestwatch.org/, https://www.unenvironment.org/resources/toolkits-manuals-and-guides/global-forest-watch',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '10 G St NE #800',
              addressLocality: 'Washington DC',
              postalCode: '20002',
              addressCountry: 'United States',
            },
          },
          ...parseGraph['@graph']
            .filter((graphItem) => graphItem['@type'] === 'BreadcrumbList')
            .map((g) => {
              return {
                ...g,
                '@id': serializeContentUrl(g['@id']),
                itemListElement: g.itemListElement.map((item) => ({
                  ...item,
                  item: {
                    ...item.item,
                    '@id': serializeContentUrl(item.item['@id']),
                    url: serializeContentUrl(item.item.url),
                  },
                })),
              };
            }),
        ],
      };

      const serialize = JSON.stringify(graph);
      if (serialize.length > 0) {
        return serialize;
      }
    } catch (_e) {
      return null;
    }
  }
  return null;
};
