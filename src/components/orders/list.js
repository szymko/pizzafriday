import React, {Component} from 'react'
import {connect} from 'react-redux'

import filter from 'lodash.filter'
import _sortBy from 'lodash.sortby'
import {setOrders} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {getOrders} from '../../actions/api'

const Warning = (props) => {
  return (
    <div className={(props.warn === 0
      ? "alert alert-warning"
      : '')}>{props.children}</div>
  )
}

class Orders extends Component {
  constructor(props) {
    super(props)
    this.getOrders()
  }

  getOrders() {
    getOrders('/order', this.props.setOrders)
  }

  displayItem(item) {
    return (
      <td>{item && <Warning warn={filter(this.props.availableRestaurants, {_id: item.restaurant}).length}>
        <i>
          {filter(this.props.restaurants, {_id: item.restaurant})[0].title}
        </i>
        <br/> {item.name}
      </Warning>
      }</td>
    )
  }

  renderList() {
    const ordersSorted = _sortBy(this.props.orders, function(order) {
      let sort = []

      if (order.menu) {
        sort.push(order.menu.restaurant)
        sort.push(order.menu.name)
      } else {
        sort.push(0)
        sort.push('')
      }

      if (order.addon)
        sort.push(order.addon.name)
      return sort
    })

    return this
      .props
      .orders
      .map((order) => {
        return (
          <tr key={order._id}>
            <td>
              <img src={order.user.image_48} className="rounded"/> {order.user.name}
            </td>

            {this.displayItem(order.menu)}

            {this.displayItem(order.addon)}

            <td>{order.comment}</td>
          </tr>
        )
      })
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3">Who</th>
            <th className="col-md-3">Danie główne</th>
            <th className="col-md-3">Dodatki</th>
            <th className="col-md-3">Komentarz</th>
          </tr>
        </thead>
        <tbody>
          {this.renderList()}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {restaurants: state.restaurants, availableRestaurants: state.availableRestaurants, orders: state.orders}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setOrders: setOrders
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)