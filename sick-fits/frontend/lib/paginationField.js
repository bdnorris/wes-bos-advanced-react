import gql from 'graphql-tag';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x); // filter out undefined items
      if (items.length && items.length !== first && page === pages) {
        // If there are items and there aren't enough items to satisfy how many were requested AND we are on the last page, then just send it
        return items;
      }
      if (items.length !== first) {
        // If we do not have any items, we must go to the network to fetch them
        return false;
      }
      if (items.length) {
        return items;
      }
      return false;
      // First thing it does when it runs is asks the read function for those items
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the Apollo client comes back from the network with our products
      console.log('	merging items from the network...');
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
