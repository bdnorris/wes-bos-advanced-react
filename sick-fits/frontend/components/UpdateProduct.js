import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

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

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  console.log(data, error, loading);
  // get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // form to handle the updates
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: data?.Product?.name,
    price: data?.Product?.price,
    description: data?.Product?.description,
  });
  if (loading) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log('inputs', inputs);
        // Submit the input fields to the backend:
        // TOOD: handle submit
        // you can capture data from the mutation here, or, you can do it above on line 37
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
        // const res = await updateProduct();
        // clearForm();
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="textarea"
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label> */}
        {/* <button type="button" onClick={clearForm}>
						Clear Form
					</button>
					<button type="button" onClick={resetForm}>
						Reset Form
					</button> */}
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
