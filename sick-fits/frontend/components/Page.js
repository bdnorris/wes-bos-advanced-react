import PropTypes from 'prop-types';

export default function Page({ children, cool }) {
  return (
    <div>
      <p>I am the Page Component!</p>
      {children}
      <h2>{cool}</h2>
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
