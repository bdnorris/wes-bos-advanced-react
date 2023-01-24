import propTypes from 'prop-types';

import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

export default function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  console.log({ data, error, loading });
  return (
    <div>
      <p>Single Product {id}</p>
    </div>
  );
}

SingleProduct.propTypes = {
  // query: propTypes.object,
};
