import PropTypes from "prop-types";

function SampleNextArrow(props) {
  return <div style={{ ...props.style, display: "none", background: "red" }} />;
}

SampleNextArrow.propTypes = {
  style: PropTypes.object, // Assuming `style` prop is an object
};
export default SampleNextArrow;
