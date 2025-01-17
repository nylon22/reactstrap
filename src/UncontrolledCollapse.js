import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from './Collapse';
import { omit, findDOMElements, defaultToggleEvents, addMultipleEventListeners } from './utils';

const omitKeys = ['toggleEvents', 'defaultOpen'];

const propTypes = {
  defaultOpen: PropTypes.bool,
  toggler: PropTypes.string.isRequired,
  toggleEvents: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  toggleEvents: defaultToggleEvents
};

class UncontrolledCollapse extends Component {
  constructor(props) {
    super(props);

    this.togglers = null;
    this.removeEventListeners = null;
    this.toggle = this.toggle.bind(this);

    this.state = { isOpen: props.defaultOpen || false };
  }

  componentDidMount() {
    this.togglers = findDOMElements(this.props.toggler);
    if (this.togglers.length) {
      this.removeEventListeners = addMultipleEventListeners(
        this.togglers,
        this.toggle,
        this.props.toggleEvents
      );
    }
  }

  componentWillUnmount() {
    if (this.togglers.length && this.removeEventListeners) {
      this.removeEventListeners();
    }
  }

  toggle(e) {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    e.preventDefault();
  }

  render() {
    return <Collapse isOpen={this.state.isOpen} {...omit(this.props, omitKeys)} aria-expanded={this.state.isOpen ? 'true' : 'false'} />;
  }
}

UncontrolledCollapse.propTypes = propTypes;
UncontrolledCollapse.defaultProps = defaultProps;

export default UncontrolledCollapse;
