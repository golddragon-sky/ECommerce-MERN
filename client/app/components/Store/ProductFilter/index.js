/**
 *
 * ProductFilter
 *
 */

import React, {Component} from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import RangeSlider from '../../Common/RangeSlider';
import actions from '../../../actions';

const priceMarks = {
  1: { label: <p className='fw-normal text-black'>$1</p> },
  5000: { label: <p className='fw-normal text-black'>$5000</p> }
};

const rateMarks = {
  0: {
    label: (
      <span>
        <span className='mr-1'>5</span>
        <i
          className='fa fa-star fa-1x'
          style={{ display: 'contents' }}
          aria-hidden='true'
        ></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className='mr-1'>4</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className='mr-1'>3</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className='mr-1'>2</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className='mr-1'>1</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const rating = v => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      0;
      return 5;
  }
};

class ProductFilter extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      current_category: ''
    }
  }

  _handleCategoryChange = (e) => {
    const {history} = this.props;
    let url = '';

    url = e.value ? '/shop/category/' + (e.label.toLowerCase()) : '/shop';
    history.push(url);

    this.setState({
      current_category: e
    })
  }

  renderCaregoryFilter = () => {
    let options = this.props.categories.map(c => (
      {
        value: c._id, 
        label: c.name
      }
    ));
    options.unshift({
        value: '',
        label: '-- All --'
      });
    const {current_category} = this.state;

    return (
      <Card className='mb-4'>
        <CardHeader tag='h3'>Categories</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <Select
              className='select-container'
              classNamePrefix='react-select'
              options={options}
              value={current_category}
              onChange={e => this._handleCategoryChange(e)}
            />
          </div>
        </CardBody>
      </Card>
    )
  }

  // componentDidUpdate = (prevProps, prevState) => {
  // }

  render = () => {
    const { filterProducts, categories } = this.props;

    return (
      <div className='product-filter'>
        { categories && categories.length > 0 && this.renderCaregoryFilter()}
  
        <Card className='mb-4'>
          <CardHeader tag='h3'>Price</CardHeader>
          <CardBody>
            <div className='mx-2 mb-3'>
              <RangeSlider
                marks={priceMarks}
                defaultValue={[1, 2500]}
                max={5000}
                onChange={v => {
                  filterProducts('price', v);
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader tag='h3'>Rating</CardHeader>
          <CardBody>
            <div className='mx-2 mb-4'>
              <RangeSlider
                type='slider'
                marks={rateMarks}
                step={20}
                defaultValue={[100]}
                onChange={v => {
                  filterProducts('rating', rating(v));
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    categories: state.category.storeCategories,
  };
};

export default connect(mapStateToProps, actions)(ProductFilter);
