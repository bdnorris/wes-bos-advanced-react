import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  list-style: none;
  margin: 0;
  padding: 0;
  img {
    max-width: 100%;
  }
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: page * perPage - perPage, first: perPage },
  });
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsList>
        {data.allProducts.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ProductsList>
    </div>
  );
}
