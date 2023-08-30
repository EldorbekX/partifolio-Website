import PropTypes from "prop-types";

function SamplePrevArrow(props) {
  return (
    <div style={{ ...props.style, display: "none", background: "green" }} />
  );
}

SamplePrevArrow.propTypes = {
  style: PropTypes.object, // Assuming `style` prop is an object
};

export default SamplePrevArrow;
