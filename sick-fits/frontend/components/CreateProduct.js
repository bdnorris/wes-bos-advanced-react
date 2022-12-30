import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Nice Shoes',
    price: 34234,
    description: 'These are the best shoes!',
  });
  return (
    <form>
      <fieldset>
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
            id="Price"
            name="Price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Upload an image"
          />
        </label>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </fieldset>
    </form>
  );
}
